export default class Note {
  constructor(id, title, description, importance, createdDate, dueDate, finishedState, finishedDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.createdDate = createdDate;
    this.dueDate = dueDate;
    this.finishState = finishedState;
    this.finishedDate = finishedDate;
  }
}
