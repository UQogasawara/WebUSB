  // グローバル変数
  let device;
  let DevInfoTable = document.getElementById('DevInfoTbl');
  let DevInfoCells = DevInfoTable.querySelectorAll('td');

  let DevConfigTable = document.getElementById('DevConfigTbl');
  let DevConfigCells = DevConfigTable.querySelectorAll('td');
  
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

      DevConfigCells[1].innerText=device.configuration.configurationValue

      }
    }
  );

function connectFunction() {
    console.log('XXXXXXXXXXXXXXXXXXXXXXX.');
}
function disconnectFunction() {
    console.log('YYYYYYYYYYYYYYYYYYYYYYY.');
}

navigator.usb.onconnect    = connectFunction
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


