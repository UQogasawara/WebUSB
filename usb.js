 // グローバル変数
  let device;
  let DevInfoTable = document.getElementById('DevInfoTbl');
  let DevInfoCells = DevInfoTable.querySelectorAll('td');
  let DevInfoShowFlg = false;

  var row;
  var cell;
  var cellText;
  var body;
  var tbl;
  var tblBody;
  
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
    if (DevInfoShowFlg != false) {
      body.removeChild(tbl);
      document.getElementById('ConfigurationDescriptor').innerText = "";
      DevInfoCells[1].innerText="-"
      DevInfoCells[3].innerText="-"
      DevInfoCells[5].innerText="-"
      DevInfoCells[7].innerText="-"
      DevInfoCells[9].innerText="-"
      DevInfoCells[11].innerText="-"
      DevInfoCells[13].innerText="-"
      DevInfoCells[15].innerText="-"
      DevInfoCells[17].innerText="-"
      DevInfoCells[19].innerText="-"
      DevInfoShowFlg = false;
    }
  });
  
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
        if ( DevInfoShowFlg == false ) {
          DevInfoShow();
        }
      }
      DevInfoShowFlg = true;
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

    var SumRows       = 0;
    var SumInterfaces = 0;
    var SumAlternates = 0;
    var SumEndpoints  = 0;
    
    var DevConfigLen     = device.configurations.length;
    var DevInterfaceLen;
    var DevAlterLen;
    var DevEpLen;
    var DevEpNum;
    var DevEpDir;
    var DevEpType;
    
    let DevConfigAry     = [];
    
    for (var i = 0; i < DevConfigLen; i++) { 
      DevInterfaceLen  = device.configurations[i].interfaces.length;
      SumInterfaces   += DevInterfaceLen;
      DevConfigAry.push("bConfigurationValue");
      DevConfigAry.push(device.configurations[i].configurationValue);
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");
      DevConfigAry.push("-");

      for (var j = 0; j < DevInterfaceLen; j++) { 
        DevAlterLen = device.configurations[i].interfaces[j].alternates.length;
        SumAlternates += DevAlterLen;
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        DevConfigAry.push("bInterfaceNumber");
        DevConfigAry.push(device.configurations[i].interfaces[j].interfaceNumber);
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        DevConfigAry.push("-");
        
        for (var k = 0; k < DevAlterLen; k++) { 
          DevEpLen = device.configurations[i].interfaces[j].alternates[k].endpoints.length;
          SumEndpoints += DevEpLen;
          
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          DevConfigAry.push("bAlternateSetting");
          DevConfigAry.push(device.configurations[i].interfaces[j].alternates[k].alternateSetting);
          DevConfigAry.push("-");
          DevConfigAry.push("-");
          
          
          for (var m = 0; m < DevEpLen; m++) { 
            DevEpNum  = device.configurations[i].interfaces[j].alternates[k].endpoints[m].endpointNumber;
            DevEpDir  = device.configurations[i].interfaces[j].alternates[k].endpoints[m].direction;
            DevEpType = device.configurations[i].interfaces[j].alternates[k].endpoints[m].type;

            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("bEndpointAddress(NUM)");
            DevConfigAry.push(DevEpNum);
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("bEndpointAddress(DIR)");
            DevConfigAry.push(DevEpDir);
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("-");
            DevConfigAry.push("bmAttributes.TransferType");
            DevConfigAry.push(DevEpType);

          }
        }
      }
    }
    
  SumRows = DevConfigLen + SumInterfaces + SumAlternates + (SumEndpoints * 3)
  console.log("SumRows"         + SumRows);
  console.log("SumInterfaces"    + SumInterfaces);
  console.log("SumAlternates" + SumAlternates);
  console.log("SumEndpoints"     + SumEndpoints);

  // body の取得
  body = document.getElementsByTagName("body")[0];

  // table 作成
  tbl = document.createElement("table");
  tblBody = document.createElement("tbody");

  // cell 作成
  for (var i = 0; i < SumRows; i++) {
    row = document.createElement("tr");
    for (var j = 0; j < 8; j++) {
      cell = document.createElement("td");
      cellText = document.createTextNode(DevConfigAry[i*8+j]);
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

  // CloseDev_btn イベント
  let CloseDev_btn = document.getElementById('CloseDev_btn');
  CloseDev_btn.addEventListener('click', async () => {
    try { 
      console.log('CloseDev_btn try.');
      document.getElementById('ConsoleLog').innerText = "CloseDev_btn try.";
      await device.close()
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );
  
  // SelectConfig_btn イベント
  let SelectConfig_btn = document.getElementById('SelectConfig_btn');
  SelectConfig_btn.addEventListener('click', async () => {
    try { 
      let SelectConfigNumber = document.getElementById('SelectConfigNumber').value;
      console.log('SelectConfig_btn try.');
      document.getElementById('ConsoleLog').innerText = "SelectConfig_btn try.";
      await device.selectConfiguration(SelectConfigNumber)
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  // ClaimInterface_btn イベント
  let ClaimInterface_btn = document.getElementById('ClaimInterface_btn');
  ClaimInterface_btn.addEventListener('click', async () => {
    try { 
      let ClaimInterfaceNumber = document.getElementById('ClaimInterfaceNumber').value;
      console.log('ClaimInterface_btn try.');
      document.getElementById('ConsoleLog').innerText = "ClaimInterface_btn try.";
      await device.claimInterface(ClaimInterfaceNumber)
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  // ReleaseInterface_btn イベント
  let ReleaseInterface_btn = document.getElementById('ReleaseInterface_btn');
  ReleaseInterface_btn.addEventListener('click', async () => {
    try { 
      let ReleaseInterfaceNumber = document.getElementById('ReleaseInterfaceNumber').value;
      console.log('ReleaseInterface_btn try.');
      document.getElementById('ConsoleLog').innerText = "ReleaseInterface_btn try.";
      await device.releaseInterface(ReleaseInterfaceNumber)
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  // DTR_RTS_btn イベント
  let DTR_RTS_btn = document.getElementById('DTR_RTS_btn');
  DTR_RTS_btn.addEventListener('click', async () => {
    try { 
      console.log('DTR_RTS_btn try.');
      document.getElementById('ConsoleLog').innerText = "DTR_RTS_btn try.";
      
      await device.controlTransferOut({
        requestType:'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x03,
        index: 0x00
      })
      
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  function toHex(v) {
    return '0x' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
  }

  // SerialSet_btn イベント
  let SerialSet_btn = document.getElementById('SerialSet_btn');
  SerialSet_btn.addEventListener('click', async () => {
    try { 
      console.log('SerialSet_btn try.');
      document.getElementById('ConsoleLog').innerText = "SerialSet_btn try.";
      
      var dwDTERate;
      var bCharFormat;
      var bParityType;
      var bDataBits;
      
      // ボーレート の設定
      var element = document.getElementsByName('dwDTERate');
      for ( var a="", i=element.length; i--; ) {
        if ( element[i].checked ) {
          dwDTERate = element[i].value ;
          break;
        }
      }
      // ストップビット の設定
      var element = document.getElementsByName('bCharFormat');
      for ( var a="", i=element.length; i--; ) {
        if ( element[i].checked ) {
          bCharFormat = element[i].value ;
          break;
        }
      }
      // パリティ の設定
      var element = document.getElementsByName('bParityType');
      for ( var a="", i=element.length; i--; ) {
        if ( element[i].checked ) {
          bParityType = element[i].value ;
          break;
        }
      }
      // データ の設定
      var element = document.getElementsByName('bDataBits');
      for ( var a="", i=element.length; i--; ) {
        if ( element[i].checked ) {
          bDataBits = element[i].value ;
          break;
        }
      }
      
      var borate;
      
      // ボーレート16進数変換
      switch(dwDTERate){
        case "9600":
          borate = toHex(9600);
          break;
        case "19200":
          borate = toHex(19200);
          break;
        case "38400":
          borate = toHex(38400);
          break;
        default :
          borate = toHex(9600);
          break;
        }
      
      var borate_0 = ((borate & 0x000000FF) >>  0);
      var borate_1 = ((borate & 0x0000FF00) >>  8);
      var borate_2 = ((borate & 0x00FF0000) >> 16);
      var borate_3 = ((borate & 0xFF000000) >> 24);
      
      var SerialSet_packet = Uint8Array.of(
        borate_0, 
        borate_1, 
        borate_2, 
        borate_3, 
        bCharFormat, 
        bParityType, 
        bDataBits)

      await device.controlTransferOut({
        requestType:'class',
        recipient: 'interface',
        request: 0x20,
        value: 0x00,
        index: 0x00
      }, SerialSet_packet)
      
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );


  function ascii (a) { return a.charCodeAt(0); }

  // BulkOutTransfer_btn イベント
  // 暫定的に 1Byte 固定にしている
  let BulkOutTransfer_btn = document.getElementById('BulkOutTransfer_btn');
  BulkOutTransfer_btn.addEventListener('click', async () => {
    try { 
      let BulkOutTransferEndpoint = document.getElementById('BulkOutTransferEndpoint').value;
      let BulkOutTransferData = document.getElementById('BulkOutTransferData').value;

      const BulkOutAry = Uint8Array.of(BulkOutTransferData)
      
      for ( var a="", i=BulkOutTransferData.length; i--; ) {
        var asciiData = ascii(BulkOutTransferData);
//        BulkOutAry.push(asciiData);
      }
      
      console.log('BulkOutTransfer_btn try.');
      document.getElementById('ConsoleLog').innerText = "BulkOutTransfer_btn try.";
      await device.transferOut(BulkOutTransferEndpoint,BulkOutAry)
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  // BulkInTransfer_btn イベント
  let BulkInTransfer_btn = document.getElementById('BulkInTransfer_btn');
  BulkInTransfer_btn.addEventListener('click', async () => {
    try { 
      let BulkInTransferEndpoint = document.getElementById('BulkInTransferEndpoint').value;
      let BulkInTransferLength = document.getElementById('BulkInTransferLength').value;
      let BulkInTransferData = document.getElementById('BulkInTransferData').value;
      
      console.log('BulkInTransfer_btn try.');
      document.getElementById('ConsoleLog').innerText = "BulkInTransfer_btn try.";
      USBInTransferResult = await device.transferIn(BulkInTransferEndpoint,BulkInTransferLength)
      
      document.getElementById('BulkInTransferData').value = String.fromCharCode(USBInTransferResult.data.getUint8());
//      var tmp = toHex(USBInTransferResult.data.getUint8());
//      document.getElementById('BulkInTransferData').value = tmp;
    }
    catch (e) { 
      // No device was selected.
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

