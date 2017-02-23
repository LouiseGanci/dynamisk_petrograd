window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);

}

function visProdukt(produkt) {
    console.log("Produkt vises");
    var klon = document.querySelector("#produkt_template").content.clodeNode
}
