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
        <div class="input-group">
            <select id="exercise_select_${exerciseCounter}" name="exercise" class="form-select-sm" aria-label="Default select example">
                <option selected>Выбрать упражнение</option>
                ${list}
            </select>
            <button disabled="true" id="add_set_button_${exerciseCounter}" data-number="${exerciseCounter}" type="button" class="btn btn-success btn-sm">Добавить подход</button>
            <button id="del_exercise_button_${exerciseCounter}" type="button" class="btn btn-warning btn-sm">Удалить упражнение</button>
            <button id="save_exercise_button_${exerciseCounter}" type="button" class="btn btn-success btn-sm">Записать упражнение</button>
        </div>
        <div id="sets_${exerciseCounter}">
            <table class="table">
                <tbody>              
                 </tbody>
            </table>    
        </div>  
    </div>
    `

    $(`#add_exercise_button`).prop("disabled", true)
    $('#exercises_blocks').append(html)
    $(`#exercise_select_${exerciseCounter}`).change(selectExercise)
    $(`#del_exercise_button_${exerciseCounter}`).click(delExerciseBlock)
    $(`#save_exercise_button_${exerciseCounter}`).click(buttonToggler)
}

function selectExercise()
{
    $(`#exercise_select_${exerciseCounter}`).prop("disabled", true)
    $(`#add_set_button_${exerciseCounter}`).prop("disabled", false).click(addSet)
}

function delExerciseBlock(){
    $(`#exercise_blocks_${exerciseCounter}`).remove()
    $(`#add_exercise_button`).prop("disabled", false)
    exerciseCounter--
    setCounter = 0
}

function addSet() {
    setCounter++
    let html = `
        <tr id="set_${exerciseCounter}_${setCounter}">
            <td>
            <input type="text" name="repetitions" placeholder="Повторения">
            </td>      
            <td>
            <input type="text" name="weight" placeholder="Вес" required>
            </td>
            <td>
            <button id="del_set_button_${exerciseCounter}_${setCounter}" data-number="${exerciseCounter}_${setCounter}" type="button" class="btn btn-danger btn-sm">Удалить подход</button>
            </td>       
        </tr>`

    let id = "#sets_" + $(this).data('number')
    console.log(id)
    $(`${id} tbody`).append(html)
    $(`#del_set_button_${exerciseCounter}_${setCounter}`).click(delSet)
    //$('input[type="text"]').keyup(buttonToggler);
}

function delSet()
{
    $(`#set_${exerciseCounter}_${setCounter}`).remove();
    setCounter--;
}

function buttonToggler() {
    $('#save_workout_button').prop('disabled', false);
    $('#add_exercise_button').prop('disabled', false);
}