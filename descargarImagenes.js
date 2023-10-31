const axios = require('axios');
const fs = require('fs');
var urlPrinicpal ="";
var config1 = {
  method: 'get',
  url: 'https://graph.facebook.com/v18.0/831836855094942',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer EAAMCICOkXOQBO6nKOpJHoXDOFtrzaAZC6H2lBVR97tqtVOthYVP1Kw5wHtZBODoX7QEW4vwcVuoP81R64Jeein5ZAIMXzLXoRTT7Pjp3N4wMYAFq11T1uToCvZC5XfUtWMHYMDu6MnbpCk5D7efR4M8oZCvSLn2F7QP0OD04NRzkqHKTwCL2IIUPXDoaJBiA2ArQJBxKfjjIL'
  }
};

axios(config1)
.then(function (response) {
    urlPrinicpal = JSON.stringify(response.data.url)
  console.log("urlPrinicpal "+urlPrinicpal);
  descargar(JSON.stringify(response.data.url))
})
.catch(function (error) {
  console.log(error);
});


function descargar(dataUrl){
    var config = {
        method: 'get',
        responseType: 'stream',
        url: dataUrl,
        // url: "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=831836855094942&ext=1696881869&hash=ATvQiWUxaTzmSCFygUpshJ-IzKQFRekHrxZU03wxVdVa4A",
        headers: { 
          'Authorization': 'Bearer EAAMCICOkXOQBO6nKOpJHoXDOFtrzaAZC6H2lBVR97tqtVOthYVP1Kw5wHtZBODoX7QEW4vwcVuoP81R64Jeein5ZAIMXzLXoRTT7Pjp3N4wMYAFq11T1uToCvZC5XfUtWMHYMDu6MnbpCk5D7efR4M8oZCvSLn2F7QP0OD04NRzkqHKTwCL2IIUPXDoaJBiA2ArQJBxKfjjIL'
        },
        mime_type: "image/jpeg",
      };
    // var config = {
    //     method: 'get',
    //     responseType: 'stream',
    //   //   url: 'https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=831836855094942&ext=1696878639&hash=ATt7Hui-x3H0v43ggo0xfuRuHKjSRL8KJqEvK1uKQo6zOQ',
    //     headers: { 
    //       'Authorization': 'Bearer EAAMCICOkXOQBO6nKOpJHoXDOFtrzaAZC6H2lBVR97tqtVOthYVP1Kw5wHtZBODoX7QEW4vwcVuoP81R64Jeein5ZAIMXzLXoRTT7Pjp3N4wMYAFq11T1uToCvZC5XfUtWMHYMDu6MnbpCk5D7efR4M8oZCvSLn2F7QP0OD04NRzkqHKTwCL2IIUPXDoaJBiA2ArQJBxKfjjIL'
    //     },
    //   //   mime_type: "image/jpeg", 
    //     url: "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=286269080980509&ext=1696878682&hash=ATtqJrZ1N0Kokipz808FwLhM3-RP_JRALS2A8bJJPGIXMg",
    //     mime_type: "application/pdf",
    //   };
    console.log("data: "+config.url)

      axios(config)
      .then(function (response) {
          
          const imageFileName = 'Prueba.'+config.mime_type.slice(config.mime_type.indexOf("/")+1);
          // const imageFileName = 'imagen_prue.'+config.mime_type.slice(config.mime_type.indexOf("/")+1);
      //   console.log(JSON.stringify(response.data));
      //   response.data.pipe(fs.createWriteStream(imageFileName));
          // Crea un flujo de escritura para guardar la imagen
          const writer = fs.createWriteStream(imageFileName);
      
          // Pipe (conectar) la respuesta de la solicitud HTTP al flujo de escritura
          response.data.pipe(writer);
      
          // Maneja eventos para saber cuándo la escritura se ha completado
          writer.on('finish', () => {
            console.log(`Imagen guardada como ${imageFileName}`);
          });
      
          writer.on('error', (err) => {
            console.error('Error al guardar la imagen:', err);
          });
        })
      .catch(function (error) {
          console.log("error");
        console.log(error.message);
      });
}

// // La URL de la imagen proporcionada en la respuesta de la API de Facebook
// const imageUrl = 'https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=870628094453924&ext=1696610789&hash=ATtuvEEA1pmqLz7EaLzbQetrhIhl0L6dT9JMxRkjb9sqKQ';

// // El nombre de archivo con el que deseas guardar la imagen localmente
// const localFileName = 'imagen_descargada.jpg';

// // Utiliza Axios para descargar la imagen
// // axios({
// //   method: 'get',
// //   url: imageUrl,
// //   responseType: 'stream', // Esto asegura que Axios maneje la respuesta como una secuencia (stream)
// // })
// axios(config)
//   .then(response => {
//     // Crea un flujo de escritura para guardar la imagen localmente
//     const writer = fs.createWriteStream(localFileName);

//     // Pipe (copiar) la respuesta de Axios (la imagen) al flujo de escritura
//     response.data.pipe(writer);

//     // Manejar eventos de finalización y error
//     writer.on('finish', () => {
//       console.log(`Imagen descargada y guardada como ${localFileName}`);
//     });
//     writer.on('error', (err) => {
//       console.error('Error al guardar la imagen:', err);
//     });
//   })
//   .catch(error => {
//     console.error('Error al descargar la imagen:', error);
//   });