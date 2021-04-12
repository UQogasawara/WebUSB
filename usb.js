  // グローバル変数
  let device;
  test1 = "1";
  
  
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
      device = await navigator.usb.requestDevice(
        {
          filters: filters
        }
      )
    }
    catch (e) { 
      // No device was selected.
      console.log("Connect_btn There is no device. " + e);
    }
    if (device !== undefined) {
      // Add |device| to the UI. 
      console.log('Add |device| to the UI.');
      }
    }
  );
  
  // DevList_btn イベント
  let DevList_btn = document.getElementById('DevList_btn');
  DevList_btn.addEventListener('click', async () => {
    try { 
      console.log('DevList_btn try.');
    }
    catch (e) { 
      // No device was selected.
      console.log("DevList_btn There is no device. " + e);
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
//      console.log("Product name: "   + device.configuration);
//      console.log("Product name: "   + device.configurations);
      console.log("opened ? "          + device.opened);
      }
    }
  );
  
  
    
  
