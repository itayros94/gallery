'use strict'

renderPortfolios()
renderModal()

function renderPortfolios() {
    var portfolios = getProtfolios()
    console.log(portfolio);
    var strHtml = portfolios.map(function(portfolio) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#${portfolio.id}">
    <div class="portfolio-hover"> <div class="portfolio-hover-content">
    <i class="fa fa-plus fa-3x"></i> </div> </div>
    <img class="img-fluid" src="${portfolio.imgUrl}" > </a>
    <div class="portfolio-caption"> <h4>${portfolio.title}</h4> <p class="text-muted">${portfolio.brand}</p>
    </div> </div>`


    }).join('');

    $('.porojectsContainer').html(strHtml)
    console.log(strHtml)
}


function renderModal() {
    var portfolios = getProtfolios()

    var strModal = portfolios.map(function(portfolio) {
        return `<div class="portfolio-modal modal fade" id="${portfolio.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content bg-dark">
            <div class="close-modal bg-light" data-dismiss="modal">
                <div class="lr">
                    <div class="rl"></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="modal-body bg-light">
                            <!-- Project Details Go Here -->
                            <h2>${portfolio.title}</h2>
                            <p class="item-intro text-muted">${portfolio.intro}</p>
                            <img class="img-fluid d-block mx-auto" src="${portfolio.imgUrl}" alt="">
                            <p>${portfolio.desc}</p>
                            <ul class="list-inline">
                                <li>${Date()}</li>
                                <li>Client: Coding Academy</li>
                                <li>Category:Game Illustration</li>
                            </ul>
                            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    }).join('')

    $('.render-modal').html(strModal)
}


function onSubmitClick() {
    window.location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to=briskeritay3@gmail.com&su=${$('input[name="Subject"]').val()}&body=${$('textarea[name="Messege-body"]').val()}%0d%0dsent%20from%20${$('input[name="Email"]').val()}`)
}

function onFacebookClick() {
    window.location.assign('https://www.facebook.com/itay.rosental/')
}

function onInstaClick() {
    window.location.assign('https://www.instagram.com/itayros/')

}

function onLinkDinClick() {
    alert('Avilibale Soon!')

}