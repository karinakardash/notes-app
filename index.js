var Notes = /** @class */ (function () {
    function Notes() {
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
    Notes.prototype.getTimeStamp = function () {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes() < 10 ? "0".concat(date.getMinutes()) : date.getMinutes();
        var sec = date.getSeconds() < 10 ? "0".concat(date.getSeconds()) : date.getSeconds();
        return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hour, ":").concat(min, ":").concat(sec);
    };
    Notes.prototype.updateNoteLabel = function (event) {
        var selectedElement = event.target;
        var elements = selectedElement.parentElement.getElementsByClassName("note__color-option");
        var color = selectedElement.getAttribute("data-color");
        selectedElement.parentNode.parentNode.setAttribute("style", "background-color:".concat(color));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            element.classList.toggle("is-active", false);
        }
        selectedElement.classList.add("is-active");
        return false;
    };
    Notes.prototype.deleteNote = function (event) {
        event.target.removeEventListener("click", this.deleteNote);
        var elem = this;
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
        return false;
    };
    Notes.prototype.createNote = function () {
        this.noteId += 1;
        var container = document.createElement("div");
        container.classList.add("note__container");
        var header = document.createElement("header");
        header.classList.add("note__header");
        var time = document.createElement("p");
        time.classList.add("note__time");
        var button = document.createElement("a");
        button.classList.add("note__delete");
        var body = document.createElement("div");
        body.classList.add("note__body");
        var content = document.createElement("div");
        content.classList.add("note__content");
        var footer = document.createElement("footer");
        footer.classList.add("note__footer");
        var id = "note".concat(this.noteId);
        var _this = this;
        container.id = id;
        for (var _i = 0, _a = this.colorArray; _i < _a.length; _i++) {
            var color = _a[_i];
            var option = document.createElement("div");
            option.classList.add("note__color-option");
            option.setAttribute("data-color", color.value);
            option.setAttribute("title", color.label);
            option.style.backgroundColor = color.value;
            option.innerHTML = color.label;
            option.addEventListener("click", _this.updateNoteLabel.bind(container), false);
            footer.appendChild(option);
        }
        var firstOption = footer.getElementsByClassName("note__color-option");
        firstOption[0].classList.add("is-active");
        container.setAttribute("style", "background-color:".concat(firstOption[0].getAttribute("data-colour")));
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
    };
    Notes.prototype.addNote = function () {
        this.notesBox.insertBefore(this.createNote(), this.notesBox.childNodes[0]);
    };
    return Notes;
}());
var notes = new Notes();
