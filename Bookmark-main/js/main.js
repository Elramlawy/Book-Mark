var bookmark = document.getElementById("bookmark")
var formRegest = document.getElementById("form_regest")
var form = document.getElementById("form")
var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var validNameMessage = document.getElementById("validNameMessage")
var validUrlMessage = document.getElementById("validUrlMessage")
var tbody = document.getElementById("tbody")
var deleteUrl = document.querySelectorAll(".delete")
var anyMessage = document.getElementById("anyMessage")
var ulMessage = document.getElementById("ulMessage")
var message_content = document.getElementById("message_content")
var closeFormWindow = document.getElementById("close")
var mainMessageError = document.getElementById("mainMessageError")
var list = []
var storageKey = "bookmark";


//********show data if localstorage key != null************/ 
if(localStorage.getItem(storageKey) != null){
    list = JSON.parse(localStorage.getItem(storageKey))
    showData(list)
}


//********open form window when onclick on bookmark button************/ 
bookmark.addEventListener("click", openForm );
function openForm(){
    formRegest.classList.add("action")
}
//********close form window when onclick on "X" icon************/ 
closeFormWindow.addEventListener("click", closeForm );
function closeForm(){
    formRegest.classList.remove("action")
    setTimeout(() => {
        clearValidMessage()
        clearInput()
      }, 17000)
}
//********close message error that show when onclick on submit************/ 
function closeMessageerror(){
    mainMessageError.classList.remove("mainMessageErrorOpen")
}
//********form submit function and check validation if true or false************/ 
form.addEventListener("submit", function(e){
    e.preventDefault();
    
   if(validName() && validUrl()){
    var urls = {
        bookmark_name: siteName.value,
        bookmark_url: siteUrl.value
    }
    list.push(urls)
    localStorage.setItem(storageKey, JSON.stringify(list))
    showData()
    clearInput()
    anyMessage.classList.add("go")
    ulMessage.classList.remove('transformUl')
    message_content.classList.remove('transformMessage')
     //********waite 7 seconds to start second animate************/
     setTimeout(() => {
        anyMessage.classList.remove('go')
        ulMessage.classList.add('transformUl')
        message_content.classList.add('transformMessage')
      }, 7000)
    clearValidMessage()
   }else{
    mainMessageError.classList.add("mainMessageErrorOpen")
}

   
})

//********show Data************/ 
function showData(){
var tableContent = "";
 for(i = 0; i < list.length; i++){
    tableContent += `
    <tr>
          <th scope="row">${i+1}</th>
          <td>${list[i].bookmark_name}</td>
          <td><a href="${list[i].bookmark_url}"  class="fa-solid fa-arrow-up-right-from-square visit"></a></td>
          <td><i onclick="deleteItem({i})" class="fa-solid fa-trash-can delete"></i></td>
        </tr>
    `
  
 }
 tbody.innerHTML = tableContent
}
//********clear Input************/ 
function clearInput(){
    siteName.value = "";
    siteUrl.value = "";
}
//********delete Item************/ 
function deleteItem(i){
 list.splice(i,1)
 localStorage.setItem(storageKey, JSON.stringify(list))
 showData();
}
//********validation name************/ 
siteName.addEventListener("input", validName);
    function validName(){
        var regux = /^([A-Z]|[a-z]){3,}$/;
        var isvalid = regux.test(siteName.value)
            if (isvalid){
                validNameMessage.innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
            } else if(!isvalid){
                validNameMessage.innerHTML = `<p>Name shuld be included string yet from 3 char</p>`;
            }
        return isvalid
    }
//********validation url************/ 
siteUrl.addEventListener("input", validUrl);
function validUrl(){
    var regux = /(https?:\/\/)(www.)([a-z]{2,}\.[a-z]{2,})/ig;
    var isvalid = regux.test(siteUrl.value)
        if (isvalid){
            validUrlMessage.innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isvalid){
            validUrlMessage.innerHTML = `<p>Url shuld be like "https://www.sitename.com"</p>`;
        }
    return isvalid
}
//********clear Valid Message************/ 
function clearValidMessage(){
    validNameMessage.innerHTML = "";
    validUrlMessage.innerHTML = "";
}








