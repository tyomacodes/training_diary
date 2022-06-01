import {getToken} from './token'

$(document).ready(init);
let exerciseCounter = 0;
let setCounter = 0;

function init() {
    $('#add_exercise_button').click(addExercise);
    $('#save_workout_button').click(saveWorkout);
}

function saveWorkout() {
    let data = $('#save_workout_form').serializeArray()
    console.log(data)
}

function addExercise() {
    $.ajax({
        type: "GET",
        accept: "application/json",
        contentType: "application/json",
        headers: {
            "Authorization": getToken()
        },
        url: '/exercise/add-exercise',
        dataType: "json",
        success: addExerciseBlock
    })
}

function addExerciseBlock(data) {
    exerciseCounter++
    let list = data.map((e) => {
        return `<li><a class="dropdown-item-text"></a></li>
        <option value="${e.id}">${e.name}</option>\n`
    }).join()

    let html = `

    <div id="exercise_blocks_${exerciseCounter}">
        <hr>   
        <table>
        <thead>
            <td>
                <select id="exercise_select_${exerciseCounter}" name="exercise" class="form-select-sm" aria-label="Default select example" >
                <option selected>Выбрать упражнение</option>
                ${list}
                </select>
            </td>
            <td>
                <button id="add_set_button_${exerciseCounter}" data-number="${exerciseCounter}" type="button" class="btn btn-success btn-sm">Добавить подход</button>
            </td>
            <td>
                <button id="del_exercise_button_${exerciseCounter}" type="button" class="btn btn-outline-warning btn-sm">Удалить упражнение</button>
            </td>
        </thead>
        </table>
        <div id="sets_${exerciseCounter}"></div>  
    </div>
    `

    $('#exercises_blocks').append(html)
    $(`#exercise_select_${exerciseCounter}`).change(selectExercise)
    $(`#del_exercise_button_${exerciseCounter}`).click(delExerciseBlock)
}

function delExerciseBlock(){
    $(`#exercise_blocks_${exerciseCounter}`).remove()
    exerciseCounter--
}

function selectExercise()
{
    let html = `
    <table class="table table-active">
        <thead>
            <tr>
                <th>Повторения</th> 
                <th>Вес</th>
                <th>Удалить подход</th> 
            </tr>
        </thead>
        <tbody>                
        </tbody>
    </table>
    `

    $(`#sets_${exerciseCounter}`).append(html);
    $(`#add_set_button_${exerciseCounter}`).click(addSet);
}

function addSet() {
    setCounter++
    let html = `
        <tr id="set_${exerciseCounter}_${setCounter}">
            <td>
            <input type="text" name="repetitions" required>
            </td>      
            <td>
            <input type="text" name="weight" required>
            </td>
            <td>
            <button id="del_set_button_${exerciseCounter}_${setCounter}" data-number="${exerciseCounter}_${setCounter}" type="button" class="btn btn-danger btn-sm">Удалить подход</button>
            </td>       
        </tr>`

    let id = "#sets_" + $(this).data('number')
    console.log(id)
    $(`${id} tbody`).append(html)
    $(`#del_set_button_${exerciseCounter}_${setCounter}`).click(delSet)
}

function delSet()
{
    $(`#set_${exerciseCounter}_${setCounter}`).remove();
    setCounter--;
}
