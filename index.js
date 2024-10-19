let closeNave = document.getElementById('close_open')
let rowData = document.getElementById('rowData')
let Search = document.getElementById('Search')
let contact = document.getElementById('contact')
$(function () {
    $('.loading').fadeOut(1000)
    $('body').css('overflow', 'visible')
})



function openNav() {
    $(".sideNave").animate({
        left: 0
    }, 500)


    $("#close_open").removeClass("fa-align-justify");
    $("#close_open").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".body").outerWidth()
    $(".sideNave").animate({
        left: -boxWidth
    }, 500)

    $("#close_open").addClass("fa-align-justify");
    $("#close_open").removeClass("fa-x");

    $(".links li").animate({
        top: 300
    }, 500)
}
closeNav()
closeNave.addEventListener('click', function () {
    if ($(".sideNave").css("left") == '0px') {
        closeNav()
    }
    else {
        openNav()
    }
})




async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    displayMeals(response.meals)

}
searchByName("")

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
       <div class="col-md-3 ">
                <div onclick="getDetailMeals('${arr[i].idMeal}')" class="meal1 position-relative overflow-hidden">
                    <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="srcset">
                    <div class="overlay_meal1 position-absolute d-flex align-items-center p-2 rounded-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategories() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await res.json()
    displayCategories(response.categories)

}
function displayCategories(arr) {
    let cartona = ""
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal1 position-relative overflow-hidden">
            <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-2" alt="srcset">
            <div class="overlay_meal1 position-absolute text-center p-2 rounded-2">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>
`
    }

    rowData.innerHTML = cartona
    Search.innerHTML = ""


}

async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}



async function getArea() {
    let res = await fetch(`https:www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await res.json()
    displaygetArea(response.meals)

}

function displaygetArea(arr) {
    let cartona = ""
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal1 position-relative overflow-hidden text-center text-white">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
        </div>
    </div>`
    }
    rowData.innerHTML = cartona
    Search.innerHTML = ""


}

async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))

}



async function getIngredients() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await res.json()
    displayIngredients(response.meals.slice(0, 20))

}
function displayIngredients(arr) {
    let cartona = ""
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
        <div  onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal1 position-relative overflow-hidden text-center text-white">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>
`
    }

    rowData.innerHTML = cartona
    Search.innerHTML = ""
}

async function getIngredientsMeals(ingredients) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))

}



function showSearchInputs() {
    Search.innerHTML = ` <div class="row py-4" >
            <div class="col">
              <input onkeyup="searchByName(this.value)" type="text" class="text-white form-control bg-transparent" placeholder="Search By Name" aria-label="First name">
            </div>
            <div class="col">
              <input  onkeyup="searchByFLetter(this.value)" maxlength="1"  type="text" class=" text-white form-control bg-transparent" placeholder="Search By First Letter" aria-label="Last name">
            </div>
          </div>`
    rowData.innerHTML = " "

}

function showContacts() {
    rowData.innerHTML = ` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    Search.innerHTML = ""
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}




async function getDetailMeals(mealID) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    response = await res.json()

    displayDetailmeals(response.meals[0])
}

function displayDetailmeals(meal) {


    let ingredients = ''
    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += ` <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li> `
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartona = `         <div class="col-md-4 text-white">
                <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category :  </span>${meal.strCategory}</h3>
                <h3><span class="fw-bolder">Recipes :  </span></h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                                   ${ingredients}

                </ul>
                <h3><span class="fw-bolder">Tags :</span></h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">

                ${tagsStr}
                </ul>



                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>




            </div>`
    rowData.innerHTML = cartona

}


function inputsValidation(){

}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}



async function searchByName(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)


}

async function searchByFLetter(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)


}