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
    ];
 
  // Connect_btn イベント
  let Connect_btn = document.getElementById('Connect_btn');
  Connect_btn.addEventListener('click', async () => {
    try { 
      console.log('Connect_btn try.');
      document.getElementById('ConsoleLog').innerText = "Connect_btn try.";
      // USBデバイスのリクエスト
      // USBDevice 型を得る。WebUSB は何をするにも USBDevice 型が必要
      device = await navigator.usb.requestDevice(
        {
          // filter は空なので接続デバイス全てを表示する
          filters: filters
        }
      )
    }
    catch (e) { 
      // デバイスが見つからなかった場合
      console.log("Connect_btn There is no device. " + e);
      document.getElementById('ConsoleLog').innerText = "Connect_btn There is no device. " + e;
    }
    if (device !== undefined) {
      // デバイスが見つかった
      // ここでは何も処理をしない。全ての処理はボタントリガーにする
      console.log('Connect_btn OK.');
      document.getElementById('ConsoleLog').innerText = "Connect_btn OK.";
      
    }
    if (DevInfoShowFlg != false) {
      // DeviceDescriptor, ConfigurationDescriptor のテーブルを削除する
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
      // try でエラーになることがないので通常このパスには入らない。
      console.log("DevInfo_btn There is no device. " + e);
      document.getElementById('ConsoleLog').innerText = "DevInfo_btn There is no device. " + e;
    }
    if (device !== undefined) {
      // Connectボタン押下済みであればこのパスに入る
        if ( DevInfoShowFlg == false ) {
          // DeviceDescriptor, ConfigurationDescriptor のテーブルを表示する
          DevInfoShow();
        }
      }
      DevInfoShowFlg = true;
    }
  );
  
  // デバッグ用の表示処理
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
    
    // DevInfoCells は DeviceDescriptor の表。偶数番はメンバとして html で記載している。奇数番のみここで取得する
    // 全て device 型から引っ張ってこれる
    // デバイスに依存しないので静的に生成しておく
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
    
    // デバイスによって ConfigurationDescriptor は異なるので表は動的に生成する
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
      // bConfigurationValue について記載
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
        // bInterfaceNumber について記載
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
          // bAlternateSetting について記載
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
            // bEndpoint について記載
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
    
    // 何行のテーブルにするのか決める
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
      // オープンの処理
      // Windows の場合は Winusb.sys を使わないとエラーになる。Zading や .inf で回避可能
      await device.open()
    }
    catch (e) { 
      // エラーパス
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
      // クローズ処理
      await device.close()
    }
    catch (e) { 
      // エラーパス
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
      // コンフィグレーションの選択
      await device.selectConfiguration(SelectConfigNumber)
    }
    catch (e) { 
      // エラーパス
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
      // インターフェースの選択
      // HID はエラーになる
      // VUC や CDC-ACM などであればエラー回避できる
      await device.claimInterface(ClaimInterfaceNumber)
    }
    catch (e) { 
      // エラーパス
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
      // インターフェースの選択
      await device.releaseInterface(ReleaseInterfaceNumber)
    }
    catch (e) { 
      // エラーパス
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
      
      // コントロール転送 DTR, RTS を 1 に設定する
      await device.controlTransferOut({
        requestType:'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x03,
        index: 0x00
      })
      
    }
    catch (e) { 
      // エラーパス
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );
  
  // 10進数 ⇒ 16進数変換
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
      // ラジオボタンから入力を取得する
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
      // toHex(dwDTERate) とすると 0x9600 になる？文字列と数値の変換とかで回避できる？
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
      
      // ラジオボタンのデータからコントロール転送に使うパケットを用意
      var SerialSet_packet = Uint8Array.of(
        borate_0, 
        borate_1, 
        borate_2, 
        borate_3, 
        bCharFormat, 
        bParityType, 
        bDataBits)
        
      // コントロール転送 シリアルの設定をする
      await device.controlTransferOut({
        requestType:'class',
        recipient: 'interface',
        request: 0x20,
        value: 0x00,
        index: 0x00
      }, SerialSet_packet)
      
    }
    catch (e) { 
      // エラーパス
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );

  // BulkOutTransfer_btn イベント
  let BulkOutTransfer_btn = document.getElementById('BulkOutTransfer_btn');
  BulkOutTransfer_btn.addEventListener('click', async () => {
    try { 
      let BulkOutTransferEndpoint = document.getElementById('BulkOutTransferEndpoint').value;
      let BulkOutTransferData = document.getElementById('BulkOutTransferData').value;
      var array = [];
      
      // データ長に合わせたバッファを作成
      var buffer = new ArrayBuffer(BulkOutTransferData.length);
      // バッファからデータビューを作成
      var view = new DataView(buffer);
      var offset = 0;
      
      for ( var tmp = BulkOutTransferData, i=BulkOutTransferData.length; i--; ) {
        
        // 先頭取り出し
        var CutData=tmp.slice( 0, 1 )
        
        // 取り出した文字を view に設定
        // CutData は "a" などが入るのでアスキー変換が必要
        view.setUint8(offset, CutData.charCodeAt(0));
        offset += 1;
        
        // 先頭削除
        var tmp = tmp.slice( 1 );
      }
      
      // 完成した buffer を Uint8Array として転送する
      var result = new Uint8Array(buffer);
      
      console.log('BulkOutTransfer_btn try.');
      document.getElementById('ConsoleLog').innerText = "BulkOutTransfer_btn try.";
      
      // BulkOut転送 
      USBOutTransferResult = await device.transferOut(BulkOutTransferEndpoint,result)
    }
    catch (e) { 
      // エラーパス
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
      
      // BulkInTransferData の部分を空にしておく
      document.getElementById('BulkInTransferData').value = "";
      
      console.log('BulkInTransfer_btn try.');
      document.getElementById('ConsoleLog').innerText = "BulkInTransfer_btn try.";
      USBInTransferResult = await device.transferIn(BulkInTransferEndpoint,BulkInTransferLength)
      
      var BulkInStr = "";
      for ( var tmp = USBInTransferResult.data, i=0; i<USBInTransferResult.data.byteLength; i++ ) {
        
        // tmp.getUint8(i) で 先頭から 1Byte 取得
        // String.fromCharCode() でアスキー変換し、BulkInStr に文字列結合する
        BulkInStr += String.fromCharCode(tmp.getUint8(i));
        
      }
      
      // BulkInStr を BulkInTransferData の枠に出力する
      document.getElementById('BulkInTransferData').value = BulkInStr;
      
    }
    catch (e) { 
      // エラーパス
      console.log(" " + e);
      document.getElementById('ConsoleLog').innerText = e;
      }
    }
  );
