//document.getElementById("btn-layer-from-text").addEventListener("click", createLayerFromText);
//document.getElementById("btn-layer-from-file").addEventListener("click", createLayerFromFile);
//document.getElementById("get-document-title").addEventListener("click", getDocumentTitle);
//document.getElementById("create-text-by-title").addEventListener("click", createTextByTitle);
//document.getElementById("create-text-by-title").addEventListener("click", creatTextBySize);
//这里查一下以看写的代码怎么传参数的
document.getElementById("create-text-by-title-36").addEventListener("click", ()=>creatTextBySize(36));
document.getElementById("create-text-by-title-48").addEventListener("click", ()=>creatTextBySize(48));
document.getElementById("create-text-by-title-60").addEventListener("click", ()=>creatTextBySize(60));
document.getElementById("create-text-by-title-72").addEventListener("click", ()=>creatTextBySize(72));
document.getElementById("create-text-by-title-100").addEventListener("click", ()=>creatTextBySize(100));
document.getElementById("set-layer-style").addEventListener("click", setLayerStyle);
//document.getElementById("getting-document-size").addEventListener("click", gettingDocumentSize);
//document.getElementById("show-layer-width-height").addEventListener("click", showLayerWidthHeight);
//document.getElementById("getting-layer-bounds").addEventListener("click", gettingLayerBounds);
document.getElementById("close-without-saving").addEventListener("click", closeWithoutSaving);
document.getElementById("save-document").addEventListener("click", saveDocument);
document.getElementById("flatten-document").addEventListener("click", flattenDocument);
document.getElementById("delete-layer").addEventListener("click", deleteTopLayer);
document.getElementById("flatten-save-close").addEventListener("click", flattenSaveClose);

function flattenSaveClose(){
  flattenDocument();
  saveDocument();
  closeWithoutSaving();
}

async function deleteTopLayer(){
  const app = require("photoshop").app;
  const cur = app.activeDocument
  const layers1 = cur.layers

  //Uncaught Error: Event: select may modify the state of Photoshop. Such events are only allowed from inside a modal scope
  return await require("photoshop").core.executeAsModal(async () => {
    await layers1 && layers1[0] && layers1[0].delete()
  }, { commandName: "Delete Top Stamp Layer" });
}

async function deleteTopStampLayer(){
  const app = require("photoshop").app;
  const cur = app.activeDocument
  const layers1 = cur.layers

  if(layers1.length > 1 && layers1[0].name == getCaptureDate())
  {
    //Uncaught Error: Event: select may modify the state of Photoshop. Such events are only allowed from inside a modal scope
    return await require("photoshop").core.executeAsModal(async () => {
      await layers1 && layers1[0] && layers1[0].delete()
    }, { commandName: "Delete Top Stamp Layer" });
  }
}

async function flattenDocument(){
  const app = require("photoshop").app;
  const cur = app.activeDocument

  return await require("photoshop").core.executeAsModal(async () => {
        await cur.flatten()
        .then((e)=>{
          console.log('hahaha');
          console.log(e);
        })
        .catch((err)=>{
          console.log('err');
          console.log(err);
        })
        ;
    }, { commandName: "Close Without Saving" });
}

async function saveDocument() {
  const app = require("photoshop").app;
  const cur = app.activeDocument

  return await require("photoshop").core.executeAsModal(async () => {
    await cur.save()
  }, { commandName: "Close Without Saving" });
}

function getDocumentTitle(){
  const app = require("photoshop").app;
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDocTitle = app.activeDocument.title;

    //showAlert("Title is:" + activeDocTitle);
    console.log("Title is:" + activeDocTitle);
    return activeDocTitle;
}

async function createTextByTitle(){
  const app = require("photoshop").app;
  if (app.documents.length == 0) {
    showAlert("Please open at least one document.");
    return;
  }
  const activeDocTitle = app.activeDocument.title;
  //showAlert("Title is:" + activeDocTitle);
  const result = await makeTextLayerByDocSize1(activeDocTitle, gettingDocumentSize());

 // showAlert(result);
  if (result[0].message) { // a message in the result means error
    //showAlert(result[0].message);
    console.log(result[0].message);
  }
  else {
    const layerID = result[0].layerID;
    console.log(`after maketextLayer, id = ${layerID}`);
  }
}

function getCaptureDate(){
  const app = require("photoshop").app;

  if (app.documents.length == 0) {
    showAlert("Please open at least one document.");
    return;
  }
  const activeDocTitle = app.activeDocument.title;
  const captureDate = activeDocTitle.split("-", 1)[0];

  return captureDate;
}

async function creatTextBySize(fontSize){
  
  const docSize = gettingDocumentSize();

  //fontSize is a STRING
  const deltaSize = {"height": 190, "width": 840};

  if(fontSize == "48"){
    deltaSize.width = 840;
    deltaSize.height = 190;
  }
  else if(fontSize == "60"){
    deltaSize.width = 1030;
    deltaSize.height = 230;
  }
  else if(fontSize == "72"){
    deltaSize.width = 1236;
    deltaSize.height = 256;
  }
  else if(fontSize == "100"){
    deltaSize.width = 1690;
    deltaSize.height = 320;
  }
  else if(fontSize == "36"){
    deltaSize.width = 625;
    deltaSize.height = 125;
  }
 
  const layerBounds = {...docSize, "top": docSize.height-deltaSize.height, "left": docSize.width-deltaSize.width};

  //MAIN PROCESS OF THE CODE
  deleteTopStampLayer();
  const result =await makeTextLayerByDocSize1(getCaptureDate(), layerBounds, fontSize);
  setLayerStyle();

  if (result[0].message) { // a message in the result means error
    showAlert(result[0].message);
    console.log(result[0].message);
  }
  else {
    const layerID = result[0].layerID;
    console.log(`after maketextLayer, id = ${layerID}`);
  }
}

///////////
// function showDocWidthHeight(){
//   const app = require("photoshop").app;
//   const currentDocument = app.activeDocument
//   const layers = currentDocument.activeLayers;

// console.log("sbb"+currentDocument.width)
//   showAlert("CurrentDocument Width:"+ currentDocument.width+ " Height:" + currentDocument.height);
// }

//////////////////gettingDocumentSize
function gettingDocumentSize(){
  const app = require("photoshop").app;
  const currentDocument = app.activeDocument
  //const layers = currentDocument.activeLayers;

 // console.log("CurrentDocument Width:"+ currentDocument.width+ " Height:" + currentDocument.height)
 // showAlert("CurrentDocument Width:"+ currentDocument.width+ " Height:" + currentDocument.height);

  return {'width': currentDocument.width, 'height': currentDocument.height};
}


// function showLayerWidthHeight(){
//   const app = require("photoshop").app;
//   const currentDocument = app.activeDocument
//   const layers = currentDocument.activeLayers;
//   const topLayer = layers[0]
//   const { left, top, right, bottom} = topLayer.bounds

//   console.log("left, top, right, bottom: "+left, top, right, bottom)
//   console.log(JSON.stringify(topLayer.bounds))
//   showAlert("left, top, right, bottom: "+left, top, right, bottom);
// }

//////////////////gettingLayerBounds
// function gettingLayerBounds(){
//   const app = require("photoshop").app;
//   const currentDocument = app.activeDocument
//   const layers = currentDocument.activeLayers;
//   const topLayer = layers[0]
//   //const { left, top, right, bottom} = topLayer.bounds

//   console.log(JSON.stringify(topLayer.bounds))
//   showAlert("Layer Bounds: " + JSON.stringify(topLayer.bounds));
// }

async function closeWithoutSaving(){
  const app = require("photoshop").app;
  const cur = app.activeDocument

  return await require("photoshop").core.executeAsModal(async () => {
    await cur.closeWithoutSaving();
  }, { commandName: "Close Without Saving" });

}

 


// async function createLayerFromText() {
//   const mytext = document.getElementById("mytext").value;
//   if (mytext.trim()) {
//     const result = await makeTextLayer(mytext.trim());
//     if (result[0].message) { // a message in the result means error
//       showAlert(result[0].message);
//     }
//     else {
//       const layerID = result[0].layerID;
//       console.log(`after maketextLayer, id = ${layerID}`);
//     }
//   }
//   else {
//     showAlert("Please enter something in the text field first.");
//   }
// }

// async function createLayerFromFile() {
// 	const fs = require("uxp").storage.localFileSystem; // always needed to access the filesystem
// 	const myFile = await fs.getFileForOpening({ types: ["txt"] });
//     if (!myFile) {
// 		showAlert("No file was selected.");
//         return;
// 	}
//     const fileContents = await myFile.read();
//     const result = await makeTextLayer(fileContents);
//     if (result[0].message) { // a message in the result means error
//       showAlert(result[0].message);
//     }
//  }

async function showAlert(message) {
  	const app = require('photoshop').app;
  	await app.showAlert(message);
}

// make a text layer in the active document
// Since there's no built-in API to make a text layer (yet),
// We do it with a batchPlay call.
async function makeTextLayerByDocSize1(theText, layerSize, fontSize) {
  fontSize=fontSize||72;
  //console.log('makeTextLayerByDocSize1');
  //console.log(fontSize)
  	const batchCommands = {
		"_obj": "make",
		"_target": [
			{
				"_ref": "textLayer"
			}
		],
		"using": {
			"_obj": "textLayer",
			"textKey": theText,
			"textShape": [
				{
					"_obj": "textShape",
					"char": {
						"_enum": "char",
						"_value": "box"
					},
					"bounds": {
						"_obj": "rectangle",
						"top": layerSize.top,
						"left": layerSize.left,
						"bottom": layerSize.height,
						"right": layerSize.width
					}
				}
			],
			"textStyleRange": [
				{
					"_obj": "textStyleRange",
					"from": 0,
					"to": theText.length,
					"textStyle": {
						"_obj": "textStyle",
						"fontName": "Microsoft YaHei",
						
						"size": {
							"_unit": "pointsUnit",
							"_value": fontSize
						},
						"color": {
							"_obj": "RGBColor",
							"red": 255,
							"green": 255,
							"blue": 255
						},
					}
				}
			],
		"_isCommand": true
		}
 	};

  	return await require("photoshop").core.executeAsModal(async () => {
  		await require('photoshop').action.batchPlay([batchCommands], {});
  	}, { commandName: "Make New Text Layer" });
}


async function setLayerStyle() {
  const batchCommands = {
    "_obj": "set",
    "_target": [
       {
          "_ref": "property",
          "_property": "layerEffects"
       },
       {
          "_ref": "layer",
          "_enum": "ordinal",
          "_value": "targetEnum"
       }
    ],
    "to": {
       "_obj": "layerEffects",
       "scale": {
          "_unit": "percentUnit",
          "_value": 333.3333333333333
       },
       "dropShadow": {
          "_obj": "dropShadow",
          "enabled": true,
          "present": true,
          "showInDialog": true,
          "mode": {
             "_enum": "blendMode",
             "_value": "multiply"
          },
          "color": {
             "_obj": "RGBColor",
             "red": 0,
             "grain": 0,
             "blue": 0
          },
          "！！！面板中的Opacity":"",
          "opacity": {
             "_unit": "percentUnit",
             "_value": 50
          },
          "useGlobalAngle": true,
          "localLightingAngle": {
             "_unit": "angleUnit",
             "_value": 90
          },
          "！！！面板中的Distance":"",
          "distance": {
             "_unit": "pixelsUnit",
             "_value": 19
          },
          "！！！面板中的Spread":"",
          "chokeMatte": {
             "_unit": "pixelsUnit",
             "_value": 21
          },
          "！！！面板中的Size":"",
          "blur": {
             "_unit": "pixelsUnit",
             "_value": 16
          },
          "noise": {
             "_unit": "percentUnit",
             "_value": 0
          },
          "antiAlias": false,
          "transferSpec": {
             "_obj": "shapeCurveType",
             "name": "线性",
             "curve": [
                {
                   "_obj": "curvePoint",
                   "horizontal": 0,
                   "vertical": 0
                },
                {
                   "_obj": "curvePoint",
                   "horizontal": 255,
                   "vertical": 255
                }
             ]
          },
          "layerConceals": true
       },
       "！！！面板中的Angle即光照的角度":"",
       "globalLightingAngle": {
          "_unit": "angleUnit",
          "_value": 140
       }
    },
 
 };

  return await require("photoshop").core.executeAsModal(async () => {
    await require('photoshop').action.batchPlay([batchCommands], {});
  }, { commandName: "Make New Text Layer" });
}

async function makeTextLayer(theText) {
  	const batchCommands = {
		"_obj": "make",
		"_target": [
			{
				"_ref": "textLayer"
			}
		],
		"using": {
			"_obj": "textLayer",
			"textKey": theText,
			"textShape": [
				{
					"_obj": "textShape",
					"char": {
						"_enum": "char",
						"_value": "box"
					},
					"bounds": {
						"_obj": "rectangle",
						"top": 200,
						"left": 100,
						"bottom": 400,
						"right": 500
					}
				}
			],
			"textStyleRange": [
				{
					"_obj": "textStyleRange",
					"from": 0,
					"to": theText.length,
					"textStyle": {
						"_obj": "textStyle",
						"fontName": "Microsoft YaHei",
						"fontStyleName": "Bold",
						"size": {
							"_unit": "pointsUnit",
							"_value": 72
						},
						"color": {
							"_obj": "RGBColor",
							"red": 0,
							"green": 0,
							"blue": 0
						},
					}
				}
			],
		"_isCommand": true
		}
 	};

  	return await require("photoshop").core.executeAsModal(async () => {
  		await require('photoshop').action.batchPlay([batchCommands], {});
  	}, { commandName: "Make New Text Layer" });
}
