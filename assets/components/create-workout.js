import {getToken} from './token'

$(document).ready(init);
let exerciseCounter = 0;

function init() {
    $('#add_exercise_button').click(addExercise);
    $('#save_workout_button').click(saveWorkout);

}

function addExercise() {
    $.ajax({
        type: "GET",
        accept: "application/json",
        contentType: "application/json",
        headers: {
            "Authorization": getToken()
        },
        url: '/api/add-exercise',
        dataType: "json",
        success: addExerciseBlock
    })
}

function addExerciseBlock(data) {
    exerciseCounter++
    let list = data.map((e) => {
        return `<li><a class="dropdown-item"></a></li>
        <option value="${e.id}">${e.name}</option>\n`
    }).join()

    let html = `
    <select id="exercise_select_${exerciseCounter}" class="form-select" aria-label="Default select example" name="exercise">
        <option selected>Выбрать упражнение</option>
        ${list}
    </select>
    
    <div id="sets_${exerciseCounter}"></div>
    `

    $('#exercises_blocks').append(html)
    $(`#exercise_select_${exerciseCounter}`).change(selectExercise)
}

function addSet() {
    let html = `
        <tr>
            <td>
            <input type="text" placeholder="Enter reps" name="repetitions">
            </td>      
            <td>
            <input type="text" placeholder="Enter weight" name="weight">
            </td>     
        </tr>
`
    let id = "#sets_" + $(this).data('number')
    console.log(id)
    $(`${id} tr:last`).after(html)
}

function saveWorkout() {
    let data = $('#save_workout_form').serializeArray()
    console.log(data)
}

function selectExercise()
{
    let html = `
    <button id="add_set_button_${exerciseCounter}" data-number="${exerciseCounter}" type="button" class="btn btn-secondary btn-sm">Добавить подход</button>

    <table id="sets_${exerciseCounter}">
            <tr>
                <th>Repetitions</th> 
                <th>Weight</th> 
            </tr>
            <tr>
            <td>
            <input type="text" placeholder="Enter reps" name="repetitions">
            </td>      
            <td>
            <input type="text" placeholder="Enter weight" name="weight">
            </td>     
            </tr>
    </table>`
    


    $(`#sets_${exerciseCounter}`).append(html)
    $(`#add_set_button_${exerciseCounter}`).click(addSet);
}