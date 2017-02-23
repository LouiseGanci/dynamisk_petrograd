window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe(listen) {
    console.table(listen);
    produktIndex = 0;
    listen.forEach(visProdukt);
}

var produktIndex = 0

function visProdukt(produkt) {
    console.log(produkt);

    //klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    if (produktIndex % 4 == 0) {
        klon.querySelector(".knap_i_midten").classList.add("col-md-offset-2");
    }

    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/small/" + produkt.billede + "-sm.jpg";

    if (produkt.udsolgt == false) {
        // produktet er ikke udsolgt
        // udsolgt-linjen skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);

    } else {
        var pris = klon.querySelector(".pris");
        pris.parentNode.removeChild(pris);
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        // der er ikke rabat, rabat-prisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // tilføj produkt-id til modalknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;

    // registrer klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik);

    if (produkt.kategori == "forretter") {
        document.querySelector(".forretterliste").appendChild(klon);
    } else if (produkt.kategori == "hovedretter") {
        document.querySelector(".hovedretterliste").appendChild(klon);
    } else if (produkt.kategori == "desserter") {
        document.querySelector(".desserterliste").appendChild(klon);
    } else if (produkt.kategori == "drikkevarer") {
        document.querySelector(".drikkevarerliste").appendChild(klon);
    } else if (produkt.kategori == "sideorders") {
        document.querySelector(".sideordersliste").appendChild(klon);

    }

    //append klon til .produkt_liste


    // tæller produkter
    produktIndex++;
}

function modalKnapKlik(event) {
    console.log("Knappen er klikket", event);

    // find produkt id, hvis knap der er blevet trykket på
    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt", produktId);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktId
    }, visModalProdukt);
}

function visModalProdukt(produkt) {
    console.log("vis modal for ", produkt);

    // find modal_template, klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_langbeskrivelse").innerHTML = produkt.langbeskrivelse;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;
    klon.querySelector(".data_billede").src = "/small/" + produkt.billede + "-sm.jpg";
    klon.querySelector(".data_oprindelsesregion").innerHTML = produkt.oprindelsesregion;



    // sletter det, der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";

    // append klonen til modal-content
    document.querySelector(".modal-content").appendChild(klon);
}
