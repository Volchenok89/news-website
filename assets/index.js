var topicField = document.getElementById("topic");
var countryField = document.getElementById("country");
var searchBtn = document.getElementById("searchBtn");
var resHead = document.getElementById("resultsHead");
var allNewsDiv = document.getElementById("all-news-div");


searchBtn.addEventListener('click',()=>{
    var apiUrl = "https://newsapi.letsoft.org/?apiKey=pub_81103400ec953ffe52f4620b597e20e922e&q=";
    var apiUrl2 = "https://ipinfo.io/119.160.97.37?token=34a756c5be6b90";
    
    allNewsDiv.innerHTML = "";
    resHead.innerHTML = "Results According To "+topicField.value
    apiUrl = apiUrl + topicField.value;
    if(countryField.value !=""){
        apiUrl = apiUrl +"&country="+countryField.value
    }

    if(countryField.value == ""){
        $.ajax({
            url: apiUrl2,
            method: "get",
            dataType: 'json',
            async: false,
            success: (res) => {
               apiUrl = apiUrl +"&country="+res['country'];
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    apiUrl = apiUrl + "&language=en";
   
    $.ajax({
        url: apiUrl,
        method: "post",
        dataType: 'json',
        success: (res) => {
            var htmlToAppend = "";
           if(res['results'].length == 0){
            resHead.innerHTML = "Results Are Not Found Related To "+topicField.value;
           }
            for(let i = 0; i < res['results'].length; i++){
                console.log(res['results'][i]);
                htmlToAppend += `
                    <div class="news-wrapper">
                        <h2>${res['results'][i].title}</h2>
                        <h3>Link:</h2>
                        <a href="${res['results'][i].link}">Click here</a>`

                if(res['results'][i].image_url) {
                    htmlToAppend += `
                        <img src="${res['results'][i].image_url}" alt="" srcset="">
                    `
                }

                if(res['results'][i].description) {
                    htmlToAppend += `
                        <h3>Description:</h2>
                        <p>${res['results'][i].description}</p>
                    `
                }

                if(res['results'][i].content) {
                    htmlToAppend += `
                    <h3>Content:</h2>
                    <p>${res['results'][i].content}</p>
                    `
                }

                htmlToAppend += `
                       
                        <span>${res['results'][i].pubDate}</span>
                    </div>
                `;
            }
            $("#all-news-div").append(htmlToAppend);
            topicField.value = "";
            countryField.value = "";
        },
        error: (err) => {
            console.log(err);
        }
    });
})