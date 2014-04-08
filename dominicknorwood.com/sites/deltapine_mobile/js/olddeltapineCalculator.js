


function setIrrigation(){
	var irrigationItems = document.yieldCalculator.irrigatedDryland;
	irrigationMethod = irrigationItems.options[irrigationItems.selectedIndex].value;
	getCompetitorVariety();		
	$("#competitor_progress").css({'display':'block'});
	//document.getElementById('competitor_progress').style.visibility = 'visible';
}	


function getCompetitorVariety() {
	
	$.ajax({
		type: "GET",
		url: "/work//deltapine_mobile/xml/deltapine_datapoints.xml",
		dataType: "xml",
		success: dataXMLParserCompetitor
	}).done();//turn off loader
	
}

function setDeltapine(){
	
	var deltapineItems = document.yieldCalculator.deltapineVariety;
	deltapineSelectionID = deltapineItems.options[deltapineItems.selectedIndex].value;
	determineDeltapineDatapointSet();
}

function setCompetitor(){
	var competitorItems = document.yieldCalculator.competitorVariety;
	competitorSelectionID = competitorItems.options[competitorItems.selectedIndex].value;
	getDeltapineVariety();
}

function getDeltapineVariety() {
	document.getElementById('deltapine_progress').style.visibility = 'visible';
	$.ajax({
		type: "GET",
		url: "/work//deltapine_mobile/xml/deltapine_datapoints.xml",
		dataType: "xml",
		success: dataXMLParserDeltapine
	}).done();//turn off loader
	
}

function determineDeltapineDatapointSet(){
	$.ajax({
		type: "GET",
		url: "/work//deltapine_mobile/xml/deltapine_datapoints.xml",
		dataType: "xml",
		success: dataXMLParserDatapoint
	}).done();//turn off loader
}

function dataXMLParserDatapoint(xml){
	$(xml).find("datapoint").each(function () {
				if((parseFloat(String(regionid)) == parseFloat($(this).find("region_id").text()) && parseFloat(String(irrigationMethod)) == parseFloat($(this).find("irg_type_id").text()) ) && parseFloat(String(competitorSelectionID)) == parseFloat($(this).find("competitor_variety_id").text()) && parseFloat(String(deltapineSelectionID)) == parseFloat($(this).find("monsanto_variety_id").text()) ) {
					
					competitorYield = $(this).find("competitor_yield_average").text();
					deltapineYield = $(this).find("monsanto_yield_average").text();
					
					//alert(competitorYield + deltapineYield);
					
					document.getElementById('competitorEstimatedYield').value = String(competitorYield);
					document.getElementById('deltapineEstimatedYield').value = String(deltapineYield);
					
		}
	});
}
	
		
function dataXMLParserDeltapine(xml){
	
	$(xml).find("datapoint").each(function () {
				if((parseFloat(String(regionid)) == parseFloat($(this).find("region_id").text()) && parseFloat(String(irrigationMethod)) == parseFloat($(this).find("irg_type_id").text()) ) && parseFloat(String(competitorSelectionID)) == parseFloat($(this).find("competitor_variety_id").text()) ) {
					var tmpID = $(this).find("monsanto_variety_id").text();
					var tmpDeltapine;
					if(tmpID == "11"){
						if (brand11 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1048 B2RF"
							brand11 = true;
						}
					}
					
					if(tmpID == "2"){
						if (brand2 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 0912 B2RF"
							brand2 = true;
						}
					}
					
					if(tmpID == "3"){
						if (brand3 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 0920 B2RF"
							brand3 = true;
						}
					}
					
					if(tmpID == "4"){
						if (brand4 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 0924 B2RF"
							brand4 = true;
						}
					}
					
					if(tmpID == "24"){
						if (brand24 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1137 B2RF"
							brand24 = true;
						}
					}
					
					if(tmpID == "23"){
						if (brand23 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1133 B2RF"
							brand23 = true;
						}
					}
					
					if(tmpID == "5"){
						if (brand5 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 0935 B2RF"
							brand5 = true;
						}
					}
					
					if(tmpID == "12"){
						if (brand12 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1050 B2RF"
							brand12 = true;
						}
					}
					
					if(tmpID == "7"){
						if (brand7 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1028 B2RF"
							brand7 = true;
						}
					}
					if(tmpID == "8"){
						if (brand8 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1032 B2RF"
							brand8 = true;
						}
					}
					if(tmpID == "9"){
						if (brand9 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1034 B2RF"
							brand9 = true;
						}
					}
					if(tmpID == "10"){
						if (brand10 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 1044 B2RF"
							brand10 = true;
						}
					}
					if(tmpID == "6"){
						if (brand6 == true){
							return;
							
						}else{
							tmpDeltapine = "DP 0949 B2RF"
							brand6 = true;
						}
					}
					
					
					AddToOptionList(document.yieldCalculator.deltapineVariety, tmpID, tmpDeltapine);
					return;	
				}
				$("#deltapineVariety").removeAttr("disabled");
				document.getElementById('deltapine_progress').style.visibility = 'hidden';
			});	

	
}
		
		
function dataXMLParserCompetitor(xml){
	$(xml).find("datapoint").each(function () {
				if((parseFloat(String(regionid)) == parseFloat($(this).find("region_id").text()) && parseFloat(String(irrigationMethod)) == parseFloat($(this).find("irg_type_id").text()) )) {
					var tmpID = $(this).find("competitor_variety_id").text();
					var tmpCompetitor;
					if(tmpID == "1"){
						if (brand1 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 1740B2RF"
							brand1 = true;
						}
					}
					
					if(tmpID == "15"){
						if (brand15 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 9170 B2F"
							brand15 = true;
						}
					}
					
					if(tmpID == "16"){
						if (brand16 == true){
							return;
							
						}else{
							tmpCompetitor = "PHY 367 WRF"
							brand16 = true;
						}
					}
					
					if(tmpID == "17"){
						if (brand17 == true){
							return;
							
						}else{
							tmpCompetitor = "PHY 375 WRF"
							brand17 = true;
						}
					}
					
					if(tmpID == "18"){
						if (brand18 == true){
							return;
							
						}else{
							tmpCompetitor = "PHY 485 WRF"
							brand18 = true;
						}
					}
					
					if(tmpID == "19"){
						if (brand19 == true){
							return;
							
						}else{
							tmpCompetitor = "PHY 565 WRF"
							brand19 = true;
						}
					}
					
					if(tmpID == "20"){
						if (brand20 == true){
							return;
							
						}else{
							tmpCompetitor = "ST 4498B2RF"
							brand20 = true;
						}
					}
					
					if(tmpID == "21"){
						if (brand21 == true){
							return;
							
						}else{
							tmpCompetitor = "ST 5288B2RF"
							brand21 = true;
						}
					}
					
					if(tmpID == "22"){
						if (brand22 == true){
							return;
							
						}else{
							tmpCompetitor = "ST 5458B2RF"
							brand22 = true;
						}
					}
					if(tmpID == "25"){
						if (brand25 == true){
							return;
							
						}else{
							tmpCompetitor = "ST 4288B2RF"
							brand25 = true;
						}
					}
					if(tmpID == "26"){
						if (brand26 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 9063 B2RF"
							brand26 = true;
						}
					}
					if(tmpID == "27"){
						if (brand27 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 9160 B2RF"
							brand27 = true;
						}
					}
					if(tmpID == "14"){
						if (brand14 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 840B2RF"
							brand14 = true;
						}
					}
					if(tmpID == "13"){
						if (brand13 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 1880 B2RF"
							brand13 = true;
						}
					}
					if(tmpID == "28"){
						if (brand28 == true){
							return;
							
						}else{
							tmpCompetitor = "FM 9180 B2RF"
							brand28 = true;
						}
					}
					
					AddToOptionList(document.yieldCalculator.competitorVariety, tmpID, tmpCompetitor);
					return;	
				}
				$("#competitorVariety").removeAttr("disabled").parent().parent().removeClass('disabled');
				
				//document.getElementById('competitor_progress').style.visibility = 'hidden';
			});
	$("#competitor_progress").fadeOut("fast");	
}

function AddToOptionList(OptionList, OptionValue, OptionText) {
// Add option to the bottom of the list
	OptionList[OptionList.length] = new Option(OptionText, OptionValue);
}


if (!NREUMQ.f) { NREUMQ.f=function() {
NREUMQ.push(["load",new Date().getTime()]);
var e=document.createElement("script");
e.type="text/javascript";e.async=true;e.src="https://d1ros97qkrwjf5.cloudfront.net/30/eum/rum.js";
document.body.appendChild(e);
if(NREUMQ.a)NREUMQ.a();
};
NREUMQ.a=window.onload;window.onload=NREUMQ.f;
};
NREUMQ.push(["nrfj","beacon-1.newrelic.com","9dfe439095",8763,"Il9dRhNbCVtVQhgXQgBTVkFOWgpTVUMYF1oORw==",0.0,30,new Date().getTime(),"","","","",""])// JavaScript Document