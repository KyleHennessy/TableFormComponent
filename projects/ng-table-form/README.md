# NgTableForm

This package provides a reusable inline table form component built using Angular and Bootstrap 5.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

![a simple example of table form component](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/intro.gif)

# Install
To use this in your angular web app, install the package from the terminal in the directory where your angular app is located.

`npm install ng-table-form`

# Instructions

The table form component can render a table with an inline form.
New rows are added when:<br />
<ul>
    <li><strong>The enter key is pressed</strong></li>
    <li><strong>The escape key is pressed</strong></li>
    <li><strong>The form loses focus</strong></li>
    <li><strong>The save button is clicked</strong></li>
    <li><strong>Tabbing to the next row</strong></li>
</ul>

![all different methods of submitting a row](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/savemethods.gif)

The table form requires a map of control names and validators as an input.<br />
The control name is the key in the map, and the value is an array of validator functions.<br/>
A row can only be valid when it meets the requirements of the validator functions in the input map.
![invalid row submission](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/invalid.gif)

If a map of control names and validator functions is not passed in as an input to the table form component, then the component won't initialize.
![failed to initialize table](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/not%20initialized.png)

The amount of headers/columns in the table is determined by the amount of key value pairs in the controls map.
![more columns](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/morecontrols.gif)

It works with any number of columns in the table.
![even more controls](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/toomanycontrols.gif)

An array of objects can optionally be passed to the component as an input to populate the table with pre defined data.<br/>
![array populated form](https://raw.githubusercontent.com/KyleHennessy/TableFormComponent/main/src/assets/array.png)

Key names in the object must match the control names in the map or else these keys will not be shown on the table.

An event emitter emits the value of a row if an event occurs.<br/>
There is a dedicated event emitter for each of these possible actions:<br/>
<ul>
    <li><strong>Creating a row</strong></li>
    <li><strong>Updating a row</strong></li>
    <li><strong>Deleting a row</strong></li>
    <li><strong>Invalid row upon clicking save</strong></li>
</ul>

You can write your own methods to react to these events as you see fit.<br/>

# How To Use
The TableFormComponent expects at the very least a map of control names and associated validator functions to be passed in as an input. The control names will be mapped to each column in the table, and the validator functions will be applied to each of the form controls.

In component.ts:
```
const controls = new Map<string, ValidatorFn[]>(
    [
        ['Surname', [Validators.required]]
    ]
);
```
In component.html:
```
<ng-table-form [controls]="controls"></ng-table-form>
```
Create, update and delete events are emitted as an output by the component that you can listen to. You are free to implement your own functionality to react to these events, such as making a call to an endpoint using row value.

An event is also emitted as an output if the row is submitted, but it was invalid due to not satisfying the validator functions that were passed in to the `controls` input.

In all cases, the event being emitted will contain the entire value of the object associated with that row.

```
<ng-table-form 
    [controls]="controls" 
    (rowCreated)="onRowCreated($event)" 
    (rowUpdated)="onRowUpdated($event)"
    (rowDeleted)="onRowDeleted($event)"
    (invalidRow)="onInvalidRow($event)">
</ng-table-form>
```

Optionally, you can  pass in an array of objects to the component to populate and initialize the table form with rows. 
Note that if there is any keys in this object that are not in the `controls` map, then they will not be displayed in the table form.

In component.ts:

```
const controls = new Map<string, ValidatorFn[]>(
    [
        ['Forename', [Validators.Required. Validators.maxLength(50)]]
        ['Surname', [Validators.required]],
        ['Email', [Validators.email]]
    ]
);
const arr = [
    {
        Forename: "John",
        Surname: "Doe",
        Email: "johndoe@email.com"
    },
    {
        Forename: "Jane",
        Surname: "Doe",
        Email: "janedoe@email.com"
    },
];
```
In component.html
```
<ng-table-form 
    [controls]="controls" 
    [array]="arr">
</ng-table-form>
```
## Demo
For a working demo that you are free to experiment with and modify, visit the demo app on [Stackblitz](https://stackblitz.com/~/github.com/KyleHennessy/TableFormComponent)

## Source Code
To view the source code or request changes, visit the repo on [GitHub](https://github.com/KyleHennessy/TableFormComponent)

## Running unit tests

Run `ng test ng-table-form` to execute the unit tests via [Karma](https://karma-runner.github.io).