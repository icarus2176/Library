const myLibrary = [];

var bookDialog = document.getElementById("bookDialog")
var form = document.getElementById("bookForm")

function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }


  function setReadBtnText(book, readBtn){
  if(book.read == "read")
    readBtn.innerText = "   Read   "
  else
    readBtn.innerText = "Not Read"
  }

function showForm(){
  bookDialog.showModal()
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  let input  = event.target.elements

  let newBook = new Book (
    input.title.value, 
    input.author.value, 
    input.pages.value, 
    input.read.value
  )

  myLibrary.push(newBook)
  displayBook(newBook)
  form.reset()
  return false
})



function displayAll() {
  for (const book of myLibrary){
    displayBook(book)
  }
}

function displayBook(book) {
  const container = document.createElement("div")
  container.className = "book"
  container.id = book.title
  container.dataset.bookIndex = myLibrary.indexOf(book)  

  container.appendChild(createTitle(book))
  container.appendChild(createAuthor(book))
  container.appendChild(createPages(book))
  container.appendChild(createButtons(book))
  
  document.getElementById("books").appendChild(container)
}

function createTitle(book){
  const title = document.createElement("div")
  title.className = "title"
  title.innerText = "Title: " + book.title
  return title
}

function createAuthor(book){
  const author = document.createElement("div")
  author.className = "author"
  author.innerText = "Author: " + book.author
  return author
}

function createPages(book){
  const pages = document.createElement("div")
  pages.className = "pages"
  pages.innerText = "Page Count: " + book.pages
  return pages
}

function createButtons(book){
  const btnContainer = document.createElement("div")
  btnContainer.className = "btnContainer"
  btnContainer.appendChild(createIsRead(book))
  btnContainer.appendChild(createDelete(book))
  return btnContainer
}

function createIsRead(book){
  const readBtn = document.createElement("button")
  readBtn.className = "readStatus"
  readBtn.addEventListener("click", () => {
    if (book.read == "read")
      book.read = "not read"
    else
      book.read = "read"

    setReadBtnText(book, readBtn)
  })
  setReadBtnText(book, readBtn)

  return readBtn
}


function createDelete(book){
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "deleteBtn"
  deleteBtn.innerText = "Delete"
  deleteBtn.addEventListener("click", () => {
    deleteBtn.parentNode.parentNode.remove()
    myLibrary.splice(myLibrary.indexOf(book), 1)
  })
  return deleteBtn
}

function closeDialog(){
  bookDialog.close()
}