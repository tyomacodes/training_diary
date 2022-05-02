import {getToken} from './token'

$(document).ready(init);

function init() {
    $('#add_exercise_button').click(addExercise);
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
    $('#exercises_blocks').append(data.view)
}
