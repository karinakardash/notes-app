type ColorSet = {
  label: string;
  value: string;
};

class Notes {
  notesBox: HTMLElement;
  btnAdd: HTMLElement;
  noteId: number;
  colorArray: Array<ColorSet>;

  constructor() {
    this.noteId = 0;
    this.colorArray = [
      { label: "pale", value: "#FEFEFF" },
      { label: "blue", value: "#eef6fb" },
      { label: "beige", value: "#FED99B" },
      { label: "red", value: "#fbd5d0" },
    ];
    this.notesBox = document.querySelector("#notes");
    this.btnAdd = document.querySelector("#btnAdd");
    this.btnAdd.addEventListener("click", this.addNote.bind(this));
    this.addNote();
  }

  getTimeStamp() {
    let date: Date = new Date();
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    let hour: number = date.getHours();
    let min: string | number =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let sec: string | number =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  }

  updateNoteLabel(event: Event) {
    let selectedElement: any = event.target;
    let elements: Array<HTMLElement> =
      selectedElement.parentElement.getElementsByClassName(
        "note__color-option"
      );
    let color: string = selectedElement.getAttribute("data-color");
    selectedElement.parentNode.parentNode.setAttribute(
      "style",
      `background-color:${color}`
    );
    for (let element of elements) {
      element.classList.toggle("is-active", false);
    }
    selectedElement.classList.add("is-active");
    return false;
  }

  deleteNote(event: Event) {
    event.target.removeEventListener("click", this.deleteNote);
    let elem: any = this;
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
    return false;
  }

  createNote() {
    this.noteId += 1;

    let container: HTMLElement = document.createElement("div");
    container.classList.add("note__container");

    let header: HTMLElement = document.createElement("header");
    header.classList.add("note__header");

    let time: HTMLElement = document.createElement("p");
    time.classList.add("note__time");

    let button: HTMLElement = document.createElement("a");
    button.classList.add("note__delete");

    let body: HTMLElement = document.createElement("div");
    body.classList.add("note__body");

    let content: HTMLElement = document.createElement("div");
    content.classList.add("note__content");

    let footer: HTMLElement = document.createElement("footer");
    footer.classList.add("note__footer");

    let id: string = `note${this.noteId}`;
    let _this: any = this;
    container.id = id;

    for (let color of this.colorArray) {
      let option: HTMLElement = document.createElement("div");
      option.classList.add("note__color-option");
      option.setAttribute("data-color", color.value);
      option.setAttribute("title", color.label);
      option.style.backgroundColor = color.value;
      option.innerHTML = color.label;
      option.addEventListener(
        "click",
        _this.updateNoteLabel.bind(container),
        false
      );
      footer.appendChild(option);
    }

    let firstOption: HTMLCollectionOf<Element> =
      footer.getElementsByClassName("note__color-option");
    firstOption[0].classList.add("is-active");
    container.setAttribute(
      "style",
      `background-color:${firstOption[0].getAttribute("data-colour")}`
    );

    button.setAttribute("data-note", id);
    button.innerHTML = "&#45;";
    time.innerHTML = this.getTimeStamp();
    content.setAttribute("contenteditable", "true");
    button.addEventListener("click", this.deleteNote.bind(container), false);

    header.appendChild(time);
    header.appendChild(button);
    container.appendChild(header);
    container.appendChild(body);
    body.appendChild(content);
    container.appendChild(footer);
    return container;
  }

  addNote() {
    this.notesBox.insertBefore(this.createNote(), this.notesBox.childNodes[0]);
  }
}

let notes = new Notes();
