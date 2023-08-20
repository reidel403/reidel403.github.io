    function plus(){
        root.innerHTML =`
        <div class="portada">
            <h2>${carrito}Catálogo Online</h2>
            <p>Esta es la versión ${version}.0.0 de prueba con un stock de 10 muestras gratis.</p>
            <button class="button" onclick="scanerQr()">Crear catálogo gratis</button>
        </div>
        <div class="portada">
            <p>Para crear un catálogo sólo debe escanear su carnet de identidad para validar su nombre, su número de teléfono se usa para crear el contacto en su página y para validar su acceso como dueño de la misma.</p>
            <button class="button2" onclick="home()">${shop}Regresar</button>
        </div>
        
        `
    }
    function urlP(sParametroNombre) { var sPaginaURL = window.location.search.substring(1); var sURLVariables = sPaginaURL.split('&'); for (var i = 0; i < sURLVariables.length; i++) { var sParametro = sURLVariables[i].split('='); if (sParametro[0] == sParametroNombre) { return sParametro[1]; } } return null; }
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
        nota(alvaroDiv)
     }

}


    function home(){
    alvaroDiv=`
        <h3>Crear catálogo</h3>
        <p>Crea un catálogo con sólo tu número de teléfono</p>
        <input onchange="cat(this.value)" placeholder="teléfono:5859****" oninput="if(this.value.length<8||this.value.length>8||this.value<50000000||this.value>59999999){this.style.color='red';pasa=0}else{this.style.color='green';pasa=1}" type="number">
        ${cerrar}
    `


        migale = JSON.parse(localStorage.upload)
        lista = JSON.parse(localStorage.lista)
        tools.innerHTML =''
        if( json.id!='3' ){
            localStorage.site = json.id
            lista[json.id]=json.name
            localStorage.lista = JSON.stringify(lista)
            ofertas=''
            json.offer.forEach((p,n)=>{
                if( new Date().getTime()-86400000<p.time ){dtime=nuevo}else{dtime=''}
                ofertas+=`
                <div class="oferta">
                    <div class="novo">${dtime}</div>
                    <img onclick="deta(${n})" class="lazy" onerror="this.src=fotoError" src="${fotoLoad}" data-src="${img+p.img}" alt="">
                    <div class="data">
                        <h3>${p.name||`Oferta ${n+1}`}</h3>
                        <pre>${carrito} $${formatea(p.costo)}</pre>
                        <pre>${stars} Stock</pre>
                    </div>
                </div>
                `
            })

            root.innerHTML=`
            <div class="portada">            
            <div class="compu">
                <select name="busca" id="mi_select" onchange="if(this.value!=''){red(raw,this.value,'GET',home)}"><option value=""></option></select>
                <svg onclick="scanerQr()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M4 14.5A1.5 1.5 0 0 1 5.5 16v2.5H9a1.5 1.5 0 0 1 0 3H5A2.5 2.5 0 0 1 2.5 19v-3A1.5 1.5 0 0 1 4 14.5Zm16 0a1.5 1.5 0 0 1 1.493 1.356L21.5 16v3a2.5 2.5 0 0 1-2.336 2.495L19 21.5h-4a1.5 1.5 0 0 1-.144-2.993L15 18.5h3.5V16a1.5 1.5 0 0 1 1.5-1.5Zm0-4a1.5 1.5 0 0 1 .144 2.993L20 13.5H4a1.5 1.5 0 0 1-.144-2.993L4 10.5h16Zm-11-8a1.5 1.5 0 0 1 .144 2.993L9 5.5H5.5V8a1.5 1.5 0 0 1-2.993.144L2.5 8V5a2.5 2.5 0 0 1 2.336-2.495L5 2.5h4Zm10 0a2.5 2.5 0 0 1 2.495 2.336L21.5 5v3a1.5 1.5 0 0 1-2.993.144L18.5 8V5.5H15a1.5 1.5 0 0 1-.144-2.993L15 2.5h4Z"/></g></svg>
                <svg onclick="plus()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"/></svg>
                <svg onclick="red(api,json.id,'GET',login)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0Zm9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984Z"/></g></svg> 
            </div>
                <h1>
                    <a href="https://api.whatsapp.com/send?phone=+53${json.phone}&text=Hola de su catálogo me interesa ">${whatsapp}</a>
                    <a href="tel:${json.phone}">${phonei}</a>
                    <a href="${json.face}">${face}</a>
                </h1>
                <h1>${json.name}</h1>
                <p>${shop}${json.info}</p>
            </div>
            
            <div class="ofertas">
                ${ofertas}
            </div>
            
            <div class="portada">
            <div class="qr">
                <img src="${makeQr({text:`https://${drive.web}?seller=${json.id}`,style:1,tag:json.name})}" alt="">
                <div class="box">
                    <h3>+53 ${json.phone}</h3>
                    <a href="https://api.whatsapp.com/send?text=Mira el catálogo online de ${json.name} creo que te puede interesar https://${drive.web}?seller=${json.id}"><h2>${whatsapp}Share link</h2></a>
                </div>
            </div>
            <p>https://${drive.web}?seller=${json.id}</p>
            </div>
            `
    for(var o in lista){
        option = document.createElement("option")
        option.setAttribute("value",o)
        texto = document.createTextNode(lista[o])
        option.appendChild(texto)
        if(o==json.id){option.setAttribute("selected",true)}
        mi_select.appendChild(option)
    }
        }else{
            drive=json
            recarga()
            red(raw,page,'GET',home)
        }
    lazyLoadInstance.update()
    }




    function red(url,path,method,callback){
        nota(`<p>${loa} conectando....</p>`)
        head = { "limite": "160", "restantes": "158", "usadas": "2", "restablece": "1691896573", "falta": "1691896573" }
        body = {
            "message":"my commit message",
            "committer":{
               "name":"name",
               "email":"email"
            },
            "content": btoa( encodeURI( JSON.stringify(json) ) ),
            "sha":sha
        }

        settings = {
            method:method,
            headers:{
            }
        }

        if( method=='PUT' ){
            settings["body"] = JSON.stringify(body);
            settings.headers["Authorization"] = "Bearer "+auth
            cache=`?${new Date().getTime()}`
        }

        fetch(url+path+cache,settings)
        .then( response => {
            status = response.status
            if( status==200 ){
                if( url==api ){
                head ={
                    limite:response.headers.get('x-ratelimit-limit'),
                    restantes:response.headers.get('x-ratelimit-remaining'),
                    usadas:response.headers.get('x-ratelimit-used'),
                    restablece:response.headers.get('x-ratelimit-reset'),
                    falta:response.headers.get('x-ratelimit-reset')
                }
                    response.json().then(response=>{
                        if(method =='PUT'){
                        
                        }else{
                            json2 = JSON.parse(decodeURI(atob(response.content)))
                            sha=response.sha
                        }
                        callback(response)                            
                    })
                }else{
                    response.text().then(response=>{
                        json = json2 = JSON.parse(decodeURI(response))
                        callback(response)
                    })
                }
            }else{
                response.text().then(response=>{
                if(status==404&&callback ==registrar){callback()}else{
                    nota("no encontrado"+response+cerrar)
                }
                
                })
            
            }
        })
        .catch( err=> {
            mo=`<button onclick="red(raw,'${path}','GET',home)">reintentar</button>`; if(path!='demos'){mo=cerrar}
            th=`<h1>Error</h1> <p>No se ha podido completar revise la conexión</p> ${mo}`
            nota(th)
            status=0
        });
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
    formatea = (n) => { 
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(n) 
    }
    function jsonSpace( jsonString ) {
        return JSON.stringify(JSON.parse(JSON.stringify(jsonString)), null, 2);
    }
    function caracter(text){
        return text.replaceAll(/[>,<]/g,'')
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
    function codigo(c){
        cd = c.replaceAll(0,'f').replaceAll(1,'0').replaceAll(2,'e').replaceAll(3,'a').replaceAll(4,'f4').replaceAll(5,'0a').replaceAll(6,'d').replaceAll(7,'5d').replaceAll(8,'5f')
        return cd
    }
    generaId = (ent) => { 
        return ent.replace(/[#]/g, function(c) { var r = Math.random() * 16 | 0, v = c == '#' ? r : (r & 0x3 | 0x8); return v.toString(16); }); 
    }


    carrito =' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M28.778 5H29c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1c0 .415.256.772.617.923L26.34 6H5.2C3.44 6 2 7.432 2 9.253l.52 8.495c.15 2.517 2.52 3.84 4.65 4.009l14.832 1.169c-.028.476.303.928.802 1.045c.572.131 1.144-.193 1.282-.74l1.064-4.134c1.068.334 1.863 1.489 1.863 2.788V22c0 1.608-1.204 3-2.635 3H3c-.547 0-1 .382-1 .956S2.447 27 2.994 27H5.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3h18a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3h.919C26.943 27 29 24.756 29 22v-.115c0-2.268-1.424-4.18-3.351-4.728L28.779 5Zm-7.162 11H20v-4h2.605l-.989 4Zm1.236-5H20V8.007l1.95.002c.84 0 1.45.776 1.25 1.582L22.852 11ZM19 8.006V11h-4.38V8l4.38.006Zm-5.38-.007V11h-4.6V7.994l4.6.005Zm-5.6-.006V11H4.111L4 9.193c0-.666.54-1.204 1.21-1.204l2.81.004ZM4.173 12H8.02v4h-3.6l-.247-4Zm.308 5H8.02v2.83l-.68-.053c-1.34-.11-2.74-.875-2.82-2.149L4.481 17Zm4.539 2.91V17h4.6v3.272l-4.6-.363Zm5.6.44V17H19v3.62c0 .026.002.051.006.076l-4.386-.346Zm5.38.25V17h1.369l-.679 2.747a1.276 1.276 0 0 1-.69.853ZM14.62 12H19v4h-4.38v-4Zm-5.6 0h4.6v4h-4.6v-4Z"/></svg>'
    shop = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zM297.583 253.491l106.787 33.545c14.137 4.643 23.553 17.771 25.195 31.201l6.006 58.812l483.545 53.979c20.763 4.022 35.353 22.769 32.446 42.041l-30.029 169.188c-3.822 17.697-18.479 29.828-34.79 30.029H457.178l-8.423 47.974h407.959c21.332.751 36.957 16.995 37.207 35.962c-.885 21.638-18.325 35.801-37.207 36.035H405.542c-22.756-1.882-39.462-19.915-35.962-41.968l19.189-105.615l-30.029-295.236l-82.764-26.366c-9.6-3.2-16.806-9.219-21.606-18.019c-9.082-19.032-.599-40.104 15.601-49.219c9.246-4.806 18.276-5.405 27.612-2.343zm162.598 559.497c31.066 0 56.25 25.184 56.25 56.25c0 31.065-25.184 56.25-56.25 56.25c-31.064 0-56.25-25.185-56.25-56.25c0-31.066 25.184-56.25 56.25-56.25zm330.175 0c31.065 0 56.25 25.184 56.25 56.25c0 31.065-25.185 56.25-56.25 56.25s-56.25-25.185-56.25-56.25c0-31.066 25.185-56.25 56.25-56.25z"/></svg> '
    nuevo ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="red" d="m34.11 24.49l-3.92-6.62l3.88-6.35a1 1 0 0 0-.85-1.52H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h31.25a1 1 0 0 0 .86-1.51Zm-23.6-3.31H9.39l-3.26-4.34v4.35H5V15h1.13l3.27 4.35V15h1.12ZM16.84 16h-3.53v1.49h3.2v1h-3.2v1.61h3.53v1h-4.66V15h4.65Zm8.29 5.16H24l-1.55-4.59l-1.55 4.61h-1.12l-2-6.18H19l1.32 4.43L21.84 15h1.22l1.46 4.43L25.85 15h1.23Z" class="clr-i-solid clr-i-solid-path-1"/> <path fill="none" d="M0 0h36v36H0z"/></svg>'
    whatsapp ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="green" stroke-width="9" d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8c0 24.9 7 49.2 20.2 70.1l3.1 5l-13.3 48.6l49.9-13.1l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8c-12.6 1.9-22.4.9-47.5-9.9c-39.7-17.2-65.7-57.2-67.7-59.8c-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6.1c2.4.1 5.7-.9 8.9 6.8c3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2c3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5z"/></svg>'
    phonei ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><mask id="ipSPhoneTwo0"><g fill="none"><path fill="#fff" stroke="#fff" stroke-width="8" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"/><path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3.918" d="M19.44 14c.444 0 .854.241 1.07.63l1.496 2.695c.196.353.205.78.024 1.14L21 21s.252 2.252 2 4c1.748 1.748 4 2 4 2l2.527-1.038c.36-.18.788-.17 1.141.025l2.703 1.503c.388.216.629.625.629 1.07v3.103c0 1.58-1.468 2.721-2.965 2.216c-3.076-1.038-7.85-3.013-10.875-6.04c-3.026-3.025-5.001-7.798-6.039-10.874c-.505-1.497.636-2.965 2.216-2.965h3.103Z"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPhoneTwo0)"/></svg>'
    mapa ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="currentColor"><path fill-rule="evenodd" d="M15.69 9.534a2.998 2.998 0 0 1 1.859 1.925l1.301 4.05c.512 1.594-.33 3.312-1.879 3.838a2.88 2.88 0 0 1-.927.153h-8.09C6.324 19.5 5 18.14 5 16.462c0-.323.05-.645.15-.952l1.3-4.05a2.998 2.998 0 0 1 1.86-1.926C8.116 8.901 8 8.297 8 7.786C8 5.419 9.79 3.5 12 3.5s4 1.919 4 4.286c0 .511-.115 1.115-.31 1.748Z" clip-rule="evenodd" opacity=".2"/><path fill-rule="evenodd" d="M10 8.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0-3a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 6.286C5.5 8.959 8.153 13.5 10 13.5c1.848 0 4.5-4.541 4.5-7.214C14.5 3.65 12.493 1.5 10 1.5S5.5 3.65 5.5 6.286Zm8 0c0 2.193-2.348 6.214-3.5 6.214c-1.151 0-3.5-4.02-3.5-6.214C6.5 4.187 8.075 2.5 10 2.5s3.5 1.687 3.5 3.786Z" clip-rule="evenodd"/><path d="M13.435 9.14a.5.5 0 0 1 .369-.929a3 3 0 0 1 1.74 1.84l1.334 4A3 3 0 0 1 14.03 18H5.97a3 3 0 0 1-2.846-3.949l1.333-4A3 3 0 0 1 6.24 8.194a.5.5 0 1 1 .355.935a2 2 0 0 0-1.19 1.239l-1.333 4A2 2 0 0 0 5.97 17h8.062a2 2 0 0 0 1.897-2.633l-1.332-4a2 2 0 0 0-1.16-1.226Z"/></g></svg>'
    face ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="118.35" height="118.35" x="4.83" y="4.83" fill="#3d5a98" rx="6.53" ry="6.53"/><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"/></svg>'
    stock ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.7 21q-.725 0-1.288-.475t-.687-1.2L3.2 10.175q-.075-.45.213-.812T4.175 9h15.65q.475 0 .763.363t.212.812l-1.525 9.15q-.125.725-.687 1.2T17.3 21H6.7Zm3.3-6h4q.425 0 .713-.288T15 14q0-.425-.288-.713T14 13h-4q-.425 0-.713.288T9 14q0 .425.288.713T10 15ZM6 8q-.425 0-.713-.288T5 7q0-.425.288-.713T6 6h12q.425 0 .713.288T19 7q0 .425-.288.713T18 8H6Zm2-3q-.425 0-.713-.288T7 4q0-.425.288-.713T8 3h8q.425 0 .713.288T17 4q0 .425-.288.713T16 5H8Z"/></svg>'
    borrar ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
    lapiz ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></svg>'
    stars ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0" stroke="black" stroke-dasharray="32" stroke-dashoffset="32" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="32;0"/><animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.5s" values="0;1"/><animate attributeName="d" dur="1.5s" repeatCount="indefinite" values="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16;M12 7L10.82 10.38L7.24 10.45L10.1 12.62L9.06 16.05L12 14M12 7L13.18 10.38L16.76 10.45L13.9 12.62L14.94 16.05L12 14;M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"/></path></svg> '    
    loa ='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z"><animateTransform attributeName="transform" attributeType="XML" dur="5s" from="360 12 12" repeatCount="indefinite" to="0 12 12" type="rotate"/></path></svg>'

    fotoError ='https://iili.io/HDbrIkv.png'
    fotoLoad ='https://i.ibb.co/j6hF7KD/miApi.gif'
    
    function deta(n){
        p = json.offer[n]
        tools.innerHTML=`
        <div onclick="fadeOut(this)" id="abc" class="capa full">
        <div class="detalle">
         <img onerror="this.src=fotoError" src="${fotoLoad}" data-src="${img+p.img}" class="pkImg lazy" alt="">
         <div class="pk">
             <h3>${shop}${p.name||`oferta ${n+1}`}</h3>
             <p>${p.info||'Sin información extra'}</p>
             <pre>${carrito+p.costo}</pre>
        </div>
        </div>
        </div>
        `
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
        //alert(getSrc().length/1024)
        croppImg(getSrc())
      };

      send.onclick = function () {
      nota(`<p> ${loa}  Subiendo... ${(getSrc().length/1024).toFixed(2)}Kb </p>`)
      urlfoto = getSrc().split(',')[1]
      name=generaId('f#####-####-#')
    fetch("https://api.github.com/repos/reidel403/db/contents/fto/"+name,{
            method:'PUT',
            headers:{"Authorization":"Bearer "+auth},
            body: JSON.stringify({
                    "message":"my commit message",
                    "committer":{ "name":"name", "email":"email"
                   },
                  "content":urlfoto,
                  "sha":""
                  })
     })
    .then(response=>response.json())
    .then(data=>{
        if(data.content.sha){
            json.image[name]=data.content.sha
            nota(`<p> Cargando...</p>`)
            setTimeout("galeria()",5000)
        }else{
            nota(JSON.stringify(data))
        }
    })
    .catch(err=>{
        nota(`<p>Error de conexión</p>${cerrar}`)
    })

      };
        
        }
    }
    
    }, false);
    if(file){
        reader.readAsDataURL(file);
    }
}


    function init(){
        if(!localStorage.upload){localStorage.upload=JSON.stringify({}); localStorage.lista=JSON.stringify({"demo":"Ejemplo"})}
        raw="https://raw.githubusercontent.com/reidel403/db/main/"
        api="https://api.github.com/repos/reidel403/db/contents/"
        img="https://raw.githubusercontent.com/reidel403/db/main/fto/"
        raws="assets/"
        sha=""
        json={}
        page= urlP('seller') || localStorage.site || 'demo'
        red(raw,'demos','GET',home)
    }




    function borra(url,sha){
        nota(`<p>${loa}Borrando...</p>`)
        fetch(api+"fto/"+url,{
            method:'DELETE',
            headers:{"Authorization":"Bearer "+auth},
            body: JSON.stringify({
                    "message":"my commit message",
                    "committer":{ "name":"name", "email":"email"
                   },
                  "sha":sha
                  })
        })
        .then(response=>response.json())
        .then(data=>{
            if(!data.message){
                delete json.image[url]
                galeria()
            }else{
                galeria()
            }
        })
        .catch(err=>{
            nota(err+cerrar)
        })


    }
    function galeria(){
//**** GALERÍA
        fts=''
        ngale=0
        migale = JSON.parse(localStorage.upload)
        for(f in json.image){
            if(json.image[f]!=''){action=`<div class="abs" onclick="borra('${f}','${json.image[f]}')">${borrar}</div>`}else{action=''}
            fts+=`
            <div class="img">
                ${action}
                <img onclick="ftos.src=img+'${f}'; offe.img='${f}'; fadeOut(abcde)" class="lazy" data-src="${img+f}" onerror="this.src=fotoError" src='${fotoLoad}' alt="${f}">
            </div>
            `
            ngale++
        }
        fts=`
        <button onclick="if(ngale<json.top+10){mifile.click()}else{nota('Límite de almacenamiento alcanzado debe borrar algunas fotos.'+cerrar)}">Subir nueva ${ngale}/${json.top+10} </button>
        ${cerrar} <div class="full fts">${fts}</div> `
    nota(fts)
    lazyLoadInstance.update()
//**** GALERÍA
    }

    function editor(){
        tools.innerHTML =''
        offe={img:fotoError,name:'',info:'',costo:'',time:new Date().getTime()}
    add=`
    <div id="ax" class="capa full">
    <div class="newOffer form">
        <h2>Oferta Nueva</h2>
        <img class="img" onclick="galeria()" id="ftos" class="lazy" src="${offe.img}" alt="">
        <input class="input" oninput="this.value=offe.name=caracter(this.value)" value="${offe.name}" placeholder="Nombre" type="">
        <input class="input" oninput="this.value=offe.costo=caracter(this.value)" value="${offe.costo}" placeholder="Precio" type="number">
        <input class="input" oninput="this.value=offe.info=caracter(this.value)" value="${offe.info}" placeholder="Detalles" type="">
        <button onclick="if(json.offer.length<json.top){json.offer.splice(0,0,offe);tools.innerHTML='';editor()}else{nota('<h3>Error</h3><p>Ha alcanzado el límite de ofertas</p>'+cerrar)}">Añadir Oferta</button>
        <button onclick="fadeOut(ax)">Cancelar</button>
    </div>
    </div>`
       
       moreData=`
           <input value="${json.user}" disabled type="">
           <input value="${json.ip}" disabled type="">
           <input value="${json.device}" disabled type="">
           <button onclick="cambiarClave()">Cambiar clave</button>
       ${cerrar}
       `
       
       
       perfil=`
               Nombre el catálogo
           <input oninput="this.value=json.name=caracter(this.value)" value="${json.name}" placeholder="Nombre Catálogo" class="input" type="">
               Descripción/Dirección
           <input oninput="this.value=json.info=caracter(this.value)" value="${json.info}" placeholder="Descripción" class="input" type="">
               Link Perfil Facebook
           <input oninput="this.value=json.face=caracter(this.value)" value="${json.face}" placeholder="Link perfil de Facebook" class="input" type="">
       <button onclick="nota(moreData)">More Data</button>
       <button onclick="editor()">Guardar</button>
       `
       
       
        offer = ''
        json.offer.forEach((o,n)=>{
            offer += `
            <div class="almacen">
                <div onclick="json.offer.splice(${n},1);editor()" class="svg">${borrar}</div>
                <img onclick="deta(${n})" onerror="this.src=fotoError" src="${img+o.img}" alt="">
                <span>${carrito+o.costo}</span>  <span>${stock}${o.name||'oferta '+(n+1)}</span>
            </div>
            `
        })
        
        root.innerHTML =`
        <input hidden id="mifile" onchange="uplo()" type="file">
        <div class="portada">
            <h1>${carrito}Tablero</h1>
            <div class="qr">
                <img src="${makeQr({text:`https://${drive.web}?seller=${json.id}`,style:1,tag:json.name})}" alt="">
                <div class="box">
                    <input disabled oninput="this.value=json.name=caracter(this.value)" value="+53 ${json.phone}" placeholder="Nombre Catálogo" class="input" type="">
                    <button class="button" onclick="nota(perfil)">Editar Perfil</button>
                </div>
            </div>

        </div>
        
        <div class="almacenDiv">
            <div id="ofe"></div>
            <button class="button2" onclick="ofe.innerHTML+=add" class="free">ofertas ${json.offer.length}/${json.top}${lapiz}</button>
            ${offer||`<div></div>`}
        </div>

        
        <div class="portada">
            <button onclick="addData();red(api,json.id,'PUT',home)" class="button">Guardar Datos 
                <div class="nota free">Los cambios demoran 5minutos en actualizarse en su página. Quedan ${head.restantes} actualizaciones de ${head.limite} por hora</div>
            </button>
        </div>
        `
    }
    function addData(){
      /***  ***/
      json.ip = localStorage.ip
      json.time = new Date().getTime()
      json.device = navigator.userAgent
      json.time = new Date().getTime()
      /***  ***/
    }


