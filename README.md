# NgTableForm

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

This package provides a reusable inline table form component for your angular apps.

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

The table form requires a map of control names and validators as an input.<br />
The control name is the key in the map, and the value is an array of validator functions.<br/>
A row can only be valid when it meets the requirements of the validator functions in the input map.

If a map of control names and validator functions is not passed in as an input to the table form component, then the component won't initialize.

The amount of headers/columns in the table is determined by the amount of key value pairs in the controls map.

It works with any number of columns in the table.


An array of objects can optionally be passed to the component as an input to populate the table with pre defined data.<br/>

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
## Running unit tests

Run `ng test ng-table-form` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Source Code

To view the source code or request changes, visit the repo on [GitHub](https://github.com/KyleHennessy/TableFormComponent)
