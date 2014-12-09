var G = 6.67384e-11; //m^3 kg^-1 s^-3
var smaTcoeff = Math.sqrt(4.0 * Math.PI * Math.PI / G);
var TsmaCoeff = Math.pow(G / 4.0 / Math.PI / Math.PI, 1.0/3.0);
var MSun = 1.989e30; // kg
var AUmeters = 149597870700.0; //meters


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


function TransitDepth( radiusPlanet, radiusStar)
{
    //returns the actual fraction (ie, not in log)
    var fraction = radiusPlanet/radiusStar;
    return fraction * fraction;
}

function TransitDepthMinScale(depthTarget, starRadius)
{
    //defines what is the maxDepth we draw -ie, what is 0 on the graph
    return 0
}    


function CheckLightCurveMatch(per0,rad0,per1,rad1,phase1) {
    var vlim = 0.05; // the limits on the values
    var plim = 0.02; // the limit on the phase
    var yesno = ((Math.abs((per1 - per0)/per0) <= vlim) &&
                 ((Math.abs(rad1-rad0)/rad0) <= vlim) &&
                 (phase1 <= plim)) ? 0:1;

    return yesno
}
