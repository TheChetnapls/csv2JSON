const fs = require('fs');


let cerealJSON = '[\r\n\t';
let cerealData = fs.readFileSync('cereal.csv', 'utf8').split('\r\n');

const cerealKey = cerealData[0].split(',');
cerealData.shift();

for (let i = 0; i < cerealData.length; i++) {
    cerealData[i] = cerealData[i].split(',');
}



for (let j = 0; j < cerealData.length; j++) {

    let dataLine = cerealData[j];
    cerealJSON = cerealJSON + '{';
    for (let k = 0; k < cerealKey.length; k++) {
        cerealJSON = cerealJSON + '\r\n\t\t';
        cerealData[j][cerealKey[k]] = dataLine[k];
        const keyStop = cerealKey.length - 1;
        if (k == keyStop) {
            //cerealJSON = cerealJSON.concat(`"${cerealKey[k]}":"${dataLine[k]}"`)
            cerealJSON = cerealJSON + '"' + `${cerealKey[k]}` + '":"' + `${dataLine[k]}` + '"\r\n\t';
        } else {
            //cerealJSON = cerealJSON.concat(`"${cerealKey[k]}":"${dataLine[k]}",/n`)
            cerealJSON = cerealJSON + '"' + `${cerealKey[k]}` + '":"' + `${dataLine[k]}` + '"' + ",";
        }
    }

    const jatt = cerealData.length - 1;
    if (j == jatt) {
        cerealJSON = cerealJSON + '\r\n\t}\r\n]';
    } else {
        cerealJSON = cerealJSON + '\r\n\t},\r\n\t';
    }

}



let jatt = () => {
    //  function jatt(){};
    fs.writeFile('cereal.json', cerealJSON, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })
}

setTimeout(jatt, 2000)
