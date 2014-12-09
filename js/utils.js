var G = 6.67384e-11; //m^3 kg^-1 s^-3
var smaTcoeff = Math.sqrt(4.0 * Math.PI * Math.PI / G);
var TsmaCoeff = Math.pow(G / 4.0 / Math.PI / Math.PI, 1.0/3.0);
var MSun = 1.989e30; // kg
var AUmeters = 149597870700.0; //meters
var RJup = 69911000.0; //meters
var RSun = 695800000.0; //meters

//keplers third law - neglect planet mass compared to star mass
function SemiMajorAxisToPeriod(starMass, semiMajorAxis) {
    var a = Math.sqrt(1.0/starMass);
    var b = Math.pow(semiMajorAxis, 1.5);
    return smaTcoeff * a * b;
}

function PeriodToSemiMajorAxis(starMass, period)
{
    var one = Math.pow(period, 2.0/3.0);
    var two = Math.pow(starMass, 1.0/3.0);
    return one * TsmaCoeff * two;
}

function ComputeTimeScale(targetPeriod, starMass) {
    return 1.5 * targetPeriod * Math.pow(starMass / MSun, 0.3); //scale by the star mass, so smaller stars do happen faster
}

function ComputeSizeScale (starMass, targetPeriod)
{
    var a = PeriodToSemiMajorAxis(starMass, targetPeriod);
    return 4.0 * a * Math.pow( a / AUmeters, 0.3); //4a but also scaled by that so that smaller systems are slightly smaller
}    

function TransitDuration(starRadius, starMass, semiMajorAxis)
{
    var denom = Math.sqrt(G * starMass / semiMajorAxis);
    return 2.0 * starRadius / denom;
}

function MaxTransitDepth( radiusPlanet, radiusStar)
{
    //returns the actual fraction (ie, not in log)
    var fraction = radiusPlanet/radiusStar;
    return fraction * fraction;
}

function TransitDepthMinScale(starRadius)
{
    //defines what is the maxDepth we draw -ie, what is 0 on the graph
    var jup = MaxTransitDepth(Rjup, starRadius);
    return Math.log(jup) * Math.Pow(starRadius / RSun, -0.3); //scale based on size - big stars have smaller depths!
}    


function lightCurve (xPos, yPos, zPos, starRadius, planetRadius)
{
    if (yPos > 0)
	return 1;
    var dist = Math.sqrt(xPos*xPos + zPos*zPos);
    if (dist > (starRadius + planetRadius))
	return 1;

    if (dist <= (starRadius - planetRadius))
	return ScaleLightCurve(MaxTransitDepth(planetRadius, starRadius));

    var r2 = planetRadius;
    var r1 = starRadius;
    var d = dist;
    
    var area = r2*r2*Math.acos( (d*d + r2*r2 - r1*r1)/(2.0*d*r2)) + r1*r1*Math.Acos( (d*d + r1*r1 - r2*r2)/(2.0*d*r1))
			-0.5*Math.Sqrt( (-1.0*d + r1 + r2) * (d - r1 + r2) * (d + r1 - r2) * (d + r1 + r2));

    return ScaleLightCurve(area / Math.PI / starRadius / starRadius);
}

var minDepth = TransitDepthMinScale(starRadius);

function ScaleLightCurve(fractionBlocked)
{
    //the minimum depth is already computed (minDepth) - that only needs to be computed once per level

    var logFrac = Math.log(fractionBlocked);
    if (logFrac < minDepth)
	return -1;
    return logFrac/minDepth; //in log space, these are both negative values, and with 0 being the max of the graph, simple division does the job
}

function CheckLightCurveMatch(per0,rad0,per1,rad1,phase1) {
    var vlim = 0.05; // the limits on the values
    var plim = 0.02; // the limit on the phase
    var yesno = ((Math.abs((per1 - per0)/per0) <= vlim) &&
                 ((Math.abs(rad1-rad0)/rad0) <= vlim) &&
                 (phase1 <= plim)) ? 0:1;

    return yesno
}
