window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");
    visProdukt();

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

var firstProduct = true

function visProdukt(produkt) {
    console.log(produkt);

    //klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    if (firstProduct == true) {
        klon.querySelector(".knap_i_midten").classList.add(".col-md-offset-2");
        firstProduct = false;
    }

    //indsæt data i klon

    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
