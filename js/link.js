    function urlP(sParametroNombre) { var sPaginaURL = window.location.search.substring(1); var sURLVariables = sPaginaURL.split('&'); for (var i = 0; i < sURLVariables.length; i++) { var sParametro = sURLVariables[i].split('='); if (sParametro[0] == sParametroNombre) { return sParametro[1]; } } return null; }
    function crear(){
        ps=false
        tools.innerHTML =""
        root.innerHTML=`
        <div class="perfil">
            <h2>Catálogo Nuevo</h2>
        <p>
            Hola está a punto de crear un catálogo de ventas o página de vendedor con el número +53${telefono}
        </p>
        <p>
            Si desea continuar escanee su carnet de identidad para registrar sus datos e ingrese una contraseña.
        </p>
        <button onclick="scanerQr()">Escanear</button>
        <button onclick="home()">No gracias</button>
        </div>
        `
    }


    function jsonSpace( jsonString ) {
        return JSON.stringify(JSON.parse(JSON.stringify(jsonString)), null, 2);
    }
    init=()=>{
        raw = "https://raw.githubusercontent.com/reidel403/db/main/"
        api = "https://api.github.com/repos/reidel403/db/contents/"
        imgs = "https://raw.githubusercontent.com/reidel403/db/main/fto/"
        cache = '?'+new Date().getTime()
        json = {}
        sha = ''
        clave=Math.floor(Math.random()*5000)+1000
        page = urlP("seller") || localStorage.seller || "demo"
        ps=true
        auth = generaId('###############')
        red(raw,'demos','GET',home)
    }
    
    function fadeOut(element) {
        element.style.display = '';
        element.style.opacity = 1;
        var last = +new Date();
        var tick = function() {
        element.style.opacity = Number(+element.style.opacity - (new Date() - last) / 200).toFixed(4);
        last = +new Date();
        if (-element.style.opacity <= 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }else{
            (element.remove())
        }
      };
      tick();
    }
    function ancho(m){
        return window.innerWidth/(window.innerWidth/m).toFixed(0)
    }
    red=(url,path,method,callback)=>{
        nota(`<p>cargando...</p>`)
            body = { "message":"actualización", "committer":{ "name":json.id, "email":json.phone }, "content": btoa( encodeURI( JSON.stringify(json) ) ), "sha":sha }
            settings = { method:method,headers:{} }
            if( method=='PUT' ){ settings["body"] = JSON.stringify(body); settings.headers["Authorization"] = "Bearer "+auth; cache=`?${new Date().getTime()}`;}
        fetch(url+path+cache,settings)
        .then( response=>{
            status=response.status
            if( status==200 ){
                if( url==api ){
                    response.json().then(response=>{
                        if( method=='GET' ){
                            json2 = JSON.parse(decodeURI(atob(response.content)))
                            sha=response.sha
                        }else{
                            cache='?'+new Date().getTime()
                        }
                        callback()
                    })
                }else{
                    response.text().then(response=>{
                        json = json2 = JSON.parse(decodeURI(response))
                        callback()
                    })
                }
            }else{
                //alert("status: "+status)
                    response.json().then(response=>{
                        //alert(jsonSpace(response))
                    })
                if(status==404 && callback ==acceder ){
                    nota(`<p> Este número no está registrado desea crear un catálogo con +53${telefono} </p> <button onclick="crear()">Crear catálogo</button> ${cerrar}`)
                }
            }
        })
        .catch(err=>{nota(err+cerrar)})
        recorte.innerHTML=`
            <div class="free"> 
                <h1>Error </h1>
                <button class="button" onclick="init()">Reintentar</button>
            </div>
        `
    }

    deta=(n)=>{
        p = json.offer[n]
        tools.innerHTML=`
        <div onclick="fadeOut(this)" id="abcde" class="capa full">
        <div id="table" class="detalle">
         <img onerror="this.src='https://iili.io/HDbrIkv.png'" src="https://i.ibb.co/j6hF7KD/miApi.gif" data-src="${imgs+p.img}" class="pkImg lazy" alt="">
         <div class="pk">
             <h3>${stock}${p.name||`oferta ${n+1}`}</h3>
             <p>${p.info||'Sin información extra'}</p>
             <pre>${carrito+p.costo}</pre>
        </div>
        </div>
        </div>
        `
    lazyLoadInstance.update()
    }

function procesaQr(r){
/*** buscador ***/
    if( r.indexOf('seller=')!=-1){
        function url2(sParametroNombre) { var sPaginaURL = r.split('?')[1]; var sURLVariables = sPaginaURL.split('&'); for (var i = 0; i < sURLVariables.length; i++) { var sParametro = sURLVariables[i].split('='); if (sParametro[0] == sParametroNombre) { return sParametro[1]; } } return null; }
        red(raw,url2('seller'),'GET',home)
    }
/*** carnet id ***/
    if( r.indexOf('\r')!=-1 && r.indexOf('CI:')!=-1 ){
        r = r.replaceAll('\n','')
        r = r.split('\r')
        carnet = {}
        r.forEach((n)=>{
           carnet[n.split(':')[0]] = n.split(':')[1]
        })
        if(ps==false){
json={
  "id": buscado,
  "api": carnet.CI,
  "name":"",
  "clave_api":generaId("######-######"),
  "time":new Date().getTime(),
  "phone":telefono,
  "user":carnet.N,
  "ip":localStorage.ip,
  "status":1,
  "file":fileok,
  "device":navigator.userAgent,
  "top":20,
  "pubicidad":"",

  "offer":[]    
} 
        
            root.innerHTML =`
            <div class="perfil">
                <h2>Bienvenido</h2>
                <p>
                    Hola ${carnet.N} se creará su nuevo catálogo con los datos siguientes. Complete el formulario
                </p>
                <h3>Administración</h3> 
                <input class="input" value="${carnet.N} ${carnet.A}" readonly type="">
                <input class="input" value="${carnet.CI}" readonly type="">
                <input class="input" value="+53 ${telefono}" readonly type="">
                <input class="input" value="${localStorage.ip}" readonly type="">
                <h3>Catálogo</h3>
                <p>De un nombre a su página</p>
                <input class="input" oninput="this.value=json.name=caracter(this.value)" value="${json.name}" placeholder="Nombre" type="">
                <p>Su clave de acceso es ${clave}</p>
                <pre>${jsonSpace(json)}</pre>
            </div>
            `
        }
     }

}
        cerrar=`<button onclick="fadeOut(abcde)">Cerrar</button>`
    function nota(c){
        tools.innerHTML=`
        <div id="abcde" class="capa full">
            <div class="form">
                ${c}
            </div>
        </div>
        `
    }




    home=()=>{
        if( json.id!=3 ){
            /*** home ***/
            ps=true
            localStorage.seller = json.id
            offer = ''
if(!localStorage.sc){localStorage.sc=JSON.stringify({})}
            sc=JSON.parse(localStorage.sc)
            sc[json.id]=json.name
            localStorage.sc=JSON.stringify(sc)

    main=``
    for(var e in sc){
        main+=`
        <div onclick="red(raw,'${e}','GET',home)" class="li">${sc[e]}</div>
        `
    }

    tools.innerHTML =''
            json.offer.forEach((p,n)=>{
                offer+=`
                <div style="width:${ancho(140)}px" onclick="deta(${n})" class="offer">
                    <img src="https://i.ibb.co/j6hF7KD/miApi.gif" onerror="this.src='https://iili.io/HDbrIkv.png'" data-src="${imgs+p.img}" class="lazy" alt="">
                    <div class="box">
                        <p>${carrito} ${p.costo||'Muestra'}</p>
                        <p>${stock} Stock${n+1}</p>
                    </div>
                </div>
                `
            })
           root.innerHTML =`
                <div class="portada free">
                    <div>
                        <p>https://${drive.web}?seller=${json.id}</p>
                        <h3>${json.name}</h3>
                        <h3>
                        <a href="tel:${json.phone}">${phonei}</a>
                        <a href="https://api.whatsapp.com/send?phone=+53${json.phone}&text=Hola de su catálogo me interesa ">${whatsapp}</a>
                        <a onclick="nota(main)">${stock+mapa}</a>
                        </h3>
                    </div>
                    <img src="${makeQr({text:`https://${drive.web}?seller=${json.id}`,style:1,tag:' '})}" alt="">
                </div>
                ${offer}
            `
        }else{
            /*** Busca page ***/
            drive = json
            ato()
            red(raw,page,'GET',home)
        }
    lazyLoadInstance.update()
    }



function uplo() {
    const file = mifile.files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function() {
        lasrc = reader.result
        croppImg(lasrc)
        mifile.value=""
    
    function croppImg(img){
        tools.innerHTML=`
        <div id="redit" class="abs full">
            <div hidden id="tool" class="abs">
      <button onclick="fadeOut(redit)">Close</button>
      <button onclick="mifile.click()">Change</button>
      <button type="button" id="replace">Crop</button>
      <button type="button" id="send">Usar</button>
            <img id="result" onclick="this.src=''" src="" alt="">
            </div>
            <div class="full">
                <img class="full" id="image" src="${img}" alt="Picture" crossorigin>
            </div>
            
        </div>
        `
        
        image.onload=()=>{
      var image = document.querySelector('#image');
      var cropper = new Cropper(image, {
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        center: true,
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 12 / 16,
        autoCropArea: 1,
        restore: true,
        modal: true,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        
        checkCrossOrigin:true,
        background:true,
        
        toggleDragModeOnDblclick: false,

        crop: function (event) {

        },
        ready: function (){
            tool.style.display="inline-block"            
            cropper.setData({
            });
        }


      });

      function getSrc(){
        
        return cropper.getCroppedCanvas(
            {
            width: 350,            
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
            }
        ).toDataURL('image/png',1);
      }

      replace.onclick = function () {
        croppImg(getSrc())
      };

      send.onclick = function () {
      nota(`<p> ${loa}  Subiendo... ${(getSrc().length/1024).toFixed(2)}Kb </p>`)
      urlfoto = getSrc().split(',')[1]
      name=generaId('f##########')
    fetch("https://api.github.com/repos/reidel403/db/contents/fto/"+name,{
            method:'PUT',
            headers:{"Authorization":"Bearer "+auth},
            body: JSON.stringify({
                    "message":"Creando oferta",
                    "committer":{ "name":json.id, "email":json.phone
                   },
                  "content":urlfoto,
                  "sha":""
                  })
     })
    .then(response=>response.json())
    .then(data=>{
        if(data.content.sha){
            json.offer.splice(0,0,{name:'',costo:'',img:name,sha:data.content.sha,info:'',time:new Date().getTime()}) 
            nota(`<p> Cargando...</p>`)
            setTimeout("editar()",5000) 
        }else{
            nota((data)+cerrar)
        }
    })
    .catch(err=>{
        nota(`<p>Error de conexión</p>${err+cerrar}`)
    })

      };
        
        }
    }
    
    }, false);
    if(file){
        reader.readAsDataURL(file);
    }
}


    function borra(n){
        nota(`<p>${loa}Borrando...</p>`)
        fetch(api+"fto/"+json.offer[n].img,{
            method:'DELETE',
            headers:{"Authorization":"Bearer "+auth},
            body: JSON.stringify({
                    "message":"my commit message",
                    "committer":{ "name":"name", "email":"email"
                   },
                  "sha":json.offer[n].sha
                  })
        })
        .then(response=>response.json())
        .then(data=>{
            if(!data.message){
                json.offer.splice(n,1)
                editar()
            }else{
                editar()
            }
        })
        .catch(err=>{
            nota(err+cerrar)
        })


    }

    function caracter(text){
        return text.replaceAll(/[>,<]/g,'')
    }

function edita(n){
    add=`
    <div class="newOffer">
        <h2>Editar Oferta</h2>
        <img class="img" class="lazy" src="${imgs+json.offer[n].img}" alt="">
        <input class="input" oninput="this.value=json.offer[${n}].name=caracter(this.value)" value="${json.offer[n].name}" placeholder="Nombre" type="">
        <input class="input" oninput="this.value=json.offer[${n}].costo=caracter(this.value)" value="${json.offer[n].costo}" placeholder="Precio" type="number">
        <input class="input" oninput="this.value=json.offer[${n}].info=caracter(this.value)" value="${json.offer[n].info}" placeholder="Detalles" type="">
        <button onclick="fadeOut(abcde);borra(${n});">Borrar</button>
        <button onclick="fadeOut(abcde);editar();">Listo</button>
    </div>`
    nota(add)
}

function editar(){
    function addData(){
      /***  ***/
      json.ip = localStorage.ip
      json.time = new Date().getTime()
      json.device = navigator.userAgent
      json.look = new Date().getTime()
      /***  ***/
    }
    ps = false
    tools.innerHTML =""
        li = ''
        json.offer.forEach((p,n)=>{
            li+=`
            <div class="li">
                <img onclick="edita(${n})" onerror="this.src='https://iili.io/HDbrIkv.png'" src="https://i.ibb.co/j6hF7KD/miApi.gif" data-src="${imgs+p.img}" class="lazy" alt="">
                <div>
                    <h3>${p.name||`oferta ${n+1}`}</h3>
                    <p>${carrito} ${p.costo||`muestra`}  ${stock+p.img}</p>
                    <p>${p.time||` time `}</p>
                    <pre>${p.sha}</pre>
                </div>
            </div>
            `
        })
    root.innerHTML =`
        <input hidden id="mifile" onchange="uplo()" type="file">
        <div class="perfil">
        <input class="input" oninput="this.value=json.name=caracter(this.value)" value="${json.name}" placeholder="Nombre page">
        <pre>${json.offer.length}/${json.top}</pre> <button onclick="mifile.click()">Add Offer</button>
        </div>
        ${li}
        <div class="perfil">
            <button onclick="cambiarClave()" class="button">Cambiar Clave</button>
            <button onclick="red(api,json.id,'PUT',home)" class="button">Listo Save data</button>
        </div>
    `
    lazyLoadInstance.update()
}

    phonei ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><mask id="ipSPhoneTwo0"><g fill="none"><path fill="#fff" stroke="#fff" stroke-width="8" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"/><path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3.918" d="M19.44 14c.444 0 .854.241 1.07.63l1.496 2.695c.196.353.205.78.024 1.14L21 21s.252 2.252 2 4c1.748 1.748 4 2 4 2l2.527-1.038c.36-.18.788-.17 1.141.025l2.703 1.503c.388.216.629.625.629 1.07v3.103c0 1.58-1.468 2.721-2.965 2.216c-3.076-1.038-7.85-3.013-10.875-6.04c-3.026-3.025-5.001-7.798-6.039-10.874c-.505-1.497.636-2.965 2.216-2.965h3.103Z"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPhoneTwo0)"/></svg>'
    whatsapp ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="green" stroke-width="9" d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8c0 24.9 7 49.2 20.2 70.1l3.1 5l-13.3 48.6l49.9-13.1l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8c-12.6 1.9-22.4.9-47.5-9.9c-39.7-17.2-65.7-57.2-67.7-59.8c-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6.1c2.4.1 5.7-.9 8.9 6.8c3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2c3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5z"/></svg>'
    stock ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.7 21q-.725 0-1.288-.475t-.687-1.2L3.2 10.175q-.075-.45.213-.812T4.175 9h15.65q.475 0 .763.363t.212.812l-1.525 9.15q-.125.725-.687 1.2T17.3 21H6.7Zm3.3-6h4q.425 0 .713-.288T15 14q0-.425-.288-.713T14 13h-4q-.425 0-.713.288T9 14q0 .425.288.713T10 15ZM6 8q-.425 0-.713-.288T5 7q0-.425.288-.713T6 6h12q.425 0 .713.288T19 7q0 .425-.288.713T18 8H6Zm2-3q-.425 0-.713-.288T7 4q0-.425.288-.713T8 3h8q.425 0 .713.288T17 4q0 .425-.288.713T16 5H8Z"/></svg>'
    mapa ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="currentColor"><path fill-rule="evenodd" d="M15.69 9.534a2.998 2.998 0 0 1 1.859 1.925l1.301 4.05c.512 1.594-.33 3.312-1.879 3.838a2.88 2.88 0 0 1-.927.153h-8.09C6.324 19.5 5 18.14 5 16.462c0-.323.05-.645.15-.952l1.3-4.05a2.998 2.998 0 0 1 1.86-1.926C8.116 8.901 8 8.297 8 7.786C8 5.419 9.79 3.5 12 3.5s4 1.919 4 4.286c0 .511-.115 1.115-.31 1.748Z" clip-rule="evenodd" opacity=".2"/><path fill-rule="evenodd" d="M10 8.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0-3a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 6.286C5.5 8.959 8.153 13.5 10 13.5c1.848 0 4.5-4.541 4.5-7.214C14.5 3.65 12.493 1.5 10 1.5S5.5 3.65 5.5 6.286Zm8 0c0 2.193-2.348 6.214-3.5 6.214c-1.151 0-3.5-4.02-3.5-6.214C6.5 4.187 8.075 2.5 10 2.5s3.5 1.687 3.5 3.786Z" clip-rule="evenodd"/><path d="M13.435 9.14a.5.5 0 0 1 .369-.929a3 3 0 0 1 1.74 1.84l1.334 4A3 3 0 0 1 14.03 18H5.97a3 3 0 0 1-2.846-3.949l1.333-4A3 3 0 0 1 6.24 8.194a.5.5 0 1 1 .355.935a2 2 0 0 0-1.19 1.239l-1.333 4A2 2 0 0 0 5.97 17h8.062a2 2 0 0 0 1.897-2.633l-1.332-4a2 2 0 0 0-1.16-1.226Z"/></g></svg>'
    carrito =' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M28.778 5H29c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1c0 .415.256.772.617.923L26.34 6H5.2C3.44 6 2 7.432 2 9.253l.52 8.495c.15 2.517 2.52 3.84 4.65 4.009l14.832 1.169c-.028.476.303.928.802 1.045c.572.131 1.144-.193 1.282-.74l1.064-4.134c1.068.334 1.863 1.489 1.863 2.788V22c0 1.608-1.204 3-2.635 3H3c-.547 0-1 .382-1 .956S2.447 27 2.994 27H5.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3h18a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3h.919C26.943 27 29 24.756 29 22v-.115c0-2.268-1.424-4.18-3.351-4.728L28.779 5Zm-7.162 11H20v-4h2.605l-.989 4Zm1.236-5H20V8.007l1.95.002c.84 0 1.45.776 1.25 1.582L22.852 11ZM19 8.006V11h-4.38V8l4.38.006Zm-5.38-.007V11h-4.6V7.994l4.6.005Zm-5.6-.006V11H4.111L4 9.193c0-.666.54-1.204 1.21-1.204l2.81.004ZM4.173 12H8.02v4h-3.6l-.247-4Zm.308 5H8.02v2.83l-.68-.053c-1.34-.11-2.74-.875-2.82-2.149L4.481 17Zm4.539 2.91V17h4.6v3.272l-4.6-.363Zm5.6.44V17H19v3.62c0 .026.002.051.006.076l-4.386-.346Zm5.38.25V17h1.369l-.679 2.747a1.276 1.276 0 0 1-.69.853ZM14.62 12H19v4h-4.38v-4Zm-5.6 0h4.6v4h-4.6v-4Z"/></svg>'
    loa ='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z"><animateTransform attributeName="transform" attributeType="XML" dur="5s" from="360 12 12" repeatCount="indefinite" to="0 12 12" type="rotate"/></path></svg>'




