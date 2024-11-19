let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
  },

  delete: (req, res) => {
    // Implement this code
    /*
      Todo:
      - Get the reminder ID first 
      based on the edit func, can use
      req.params.id; to get each id 
      - Find the index of the reminder
      can assign the reminder.id to the deleteID
      - Remove said Reminder using splice 
    */
    // 1. Get the reminder ID
      let deleteID = req.params.id;
    // 2. Here i am assigning the reminder Id to the ID we want to delete
    // so when we view the reminder task, we are accessing that ID, so if we pressed delete 
    // the current ID we are in, we are splicing it to remove if from the array

    // this is similar to this:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    let index = database.cindy.reminders.findIndex(reminder => reminder.id == deleteID);
    // 3. Remove the reminder
    // "1" for the number of reminders to rremove from the starting index
    database.cindy.reminders.splice(index, 1);
    
    res.redirect("/reminders");
  },
};

module.exports = remindersController;