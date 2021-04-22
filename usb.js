  // グローバル変数
  let device;
  let DevInfoTable = document.getElementById('DevInfoTbl');
  let DevInfoCells = DevInfoTable.querySelectorAll('td');
  
  // 指定デバイスのフィルタ
  const filters = [ 
    /* filters を空にした場合、接続しているすべてのデバイスが表示される */
    /* 使っているマウス */
    // { vendorId: 0x04ca, productId: 0x0061 }, 
    /* サンプル */
    // { vendorId: 0x1209, productId: 0xa850 }
    ];
    
  
  // Connect_btn イベント
  let Connect_btn = document.getElementById('Connect_btn');
  Connect_btn.addEventListener('click', async () => {
    try { 
      console.log('Connect_btn try.');
      document.getElementById('ConsoleLog').innerText = "Connect_btn try.";
      device = await navigator.usb.requestDevice(
        {
          filters: filters
        }
      )
    }
    catch (e) { 
      // No device was selected.
      console.log("Connect_btn There is no device. " + e);
      document.getElementById('ConsoleLog').innerText = "Connect_btn There is no device. " + e;
    }
    if (device !== undefined) {
      // Add |device| to the UI. 
      console.log('Connect_btn OK.');
      document.getElementById('ConsoleLog').innerText = "Connect_btn OK.";
      }
    }
  );
  
  // DevInfo_btn イベント
  let DevInfo_btn = document.getElementById('DevInfo_btn');
  DevInfo_btn.addEventListener('click', async () => {
    try { 
      console.log('DevInfo_btn try.');
      document.getElementById('ConsoleLog').innerText = "DevInfo_btn try.";
    }
    catch (e) { 
      // No device was selected.
      console.log("DevInfo_btn There is no device. " + e);
      document.getElementById('ConsoleLog').innerText = "DevInfo_btn There is no device. " + e;
    }
    if (device !== undefined) {
      // Add |device| to the UI. 
      
      DevInfoShow();
      }
    }
  );
  
  // 接続時処理
  function DevInfoShow() {
    document.getElementById('ConfigurationDescriptor').innerText = "Configuration Descriptor";
    
    console.log("USB Ver "           + device.usbVersionMajor + "." + device.usbVersionMinor + device.usbVersionMinor);
    console.log("Class: 0x"          + device.deviceClass.toString(16));
    console.log("Subclass: 0x"       + device.deviceSubclass.toString(16));
    console.log("Protocol: 0x"       + device.deviceProtocol.toString(16));
    console.log("vendorId: 0x"       + device.vendorId.toString(16));
    console.log("productId: 0x"      + device.productId.toString(16));
    console.log("Dev Ver "           + device.deviceVersionMajor + "." + device.deviceVersionMinor + device.deviceVersionSubminor);
    console.log("manufacturerName: " + device.manufacturerName);
    console.log("productName: "      + device.productName);
    console.log("serialNumber: "     + device.serialNumber);
    console.log("opened ? "          + device.opened);
    
    DevInfoCells[1].innerText=device.usbVersionMajor + "." + device.usbVersionMinor + device.usbVersionMinor
    DevInfoCells[3].innerText="0x"+device.deviceClass.toString(16)
    DevInfoCells[5].innerText="0x"+device.deviceSubclass.toString(16)
    DevInfoCells[7].innerText="0x"+device.deviceProtocol.toString(16)
    DevInfoCells[9].innerText="0x"+device.vendorId.toString(16)
    DevInfoCells[11].innerText="0x"+device.productId.toString(16)
    DevInfoCells[13].innerText="0x"+device.deviceVersionMajor + "." + device.deviceVersionMinor + device.deviceVersionSubminor
    DevInfoCells[15].innerText=device.manufacturerName
    DevInfoCells[17].innerText=device.productName
    DevInfoCells[19].innerText=device.serialNumber
    
    // 何行表示する必要があるのか計算する
    // 表示は configurations.length;

    var SumRows;
    var DevConfigLen     = device.configurations.length;
    var DevInterfaceLen  = 0;
    var DevAlterLen      = 0;
    var DevEpLen         = 0;
    var DevEpNum;
    var DevEpDir;
    var DevEpType;
    
    let DevConfigAry     = [];
    
    for (var i = 0; i < DevConfigLen; i++) { 
      DevInterfaceLen += device.configurations[i].interfaces.length;
      DevConfigAry.push("ConfigurationValue");
      DevConfigAry.push(DevConfigLen);
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      for (var j = 0; j < DevInterfaceLen; j++) { 
        DevAlterLen += device.configurations[i].interfaces[j].alternates.length;
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        DevConfigAry.push("InterfacesLength");
        DevConfigAry.push(DevInterfaceLen);
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        for (var k = 0; k < DevAlterLen; k++) { 
          DevEpLen += device.configurations[i].interfaces[j].alternates[k].endpoints.length;
/* 
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("EpLen");
          DevConfigAry.push(DevEpLen);
*/
          for (var m = 0; m < DevEpLen; m++) { 
            DevEpNum  = device.configurations[i].interfaces[j].alternates[k].endpoints[m].endpointNumber;
            DevEpDir  = device.configurations[i].interfaces[j].alternates[k].endpoints[m].direction;
            DevEpType = device.configurations[i].interfaces[j].alternates[k].endpoints[m].type;

            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("EpNum");
            DevConfigAry.push(DevEpNum);
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("EpDir");
            DevConfigAry.push(DevEpDir);
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("EpType");
            DevConfigAry.push(DevEpType);
          }
        }
      }
    }
    
  SumRows = DevConfigLen + DevInterfaceLen + DevAlterLen + (DevEpLen * 3)
  console.log("SumRows"         + SumRows);
  console.log("DevConfigLen"    + DevConfigLen);
  console.log("DevInterfaceLen" + DevInterfaceLen);
  console.log("DevAlterLen"     + DevAlterLen);
  console.log("DevEpLen"        + DevEpLen);

  // body の取得
  var body = document.getElementsByTagName("body")[0];

  // table 作成
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // cell 作成
  for (var i = 0; i < SumRows-1; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 6; j++) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(DevConfigAry[i*6+j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  body.appendChild(tbl);
  tbl.setAttribute("border", "2");

  }
    
  // 接続時処理
  function connectFunction() {
    console.log('Connect Event.');
    document.getElementById('EventLog').innerText = "Connect Event.";
  }
  // 抜去時処理
  function disconnectFunction() {
    console.log('Disconnect Event.');
    document.getElementById('EventLog').innerText = "Disconnect Event.";
  }
  
  // 接続イベントの登録
  navigator.usb.onconnect    = connectFunction
  
  // 抜去イベントの登録
  navigator.usb.ondisconnect = disconnectFunction
  
  
  // OpenDev_btn イベント
  let OpenDev_btn = document.getElementById('OpenDev_btn');
  OpenDev_btn.addEventListener('click', async () => {
    try { 
      console.log('OpenDev_btn try.');
      document.getElementById('ConsoleLog').innerText = "OpenDev_btn try.";
      await device.open()
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );
