/**
 * Created by dmitrycherniavsky on 9/10/15.
 */
$(function(){
    var startDatePicker = $('#inputStartDate').datepicker({
        startDate: '0d',
        container: '#datePickerWrapper1',
        format: "M d, yyyy"
    }).on('changeDate', function(e){
        var endDate = endDatePicker.datepicker('getDate');
        if(new Date(e.date) > new Date(endDate)){
            $('#inputEndDate').val('')
        }
        endDatePicker.datepicker('setStartDate', e.date);
    });

    var endDatePicker = $('#inputEndDate').datepicker({
        startDate: '+1d',
        container: '#datePickerWrapper2',
        format: "M d, yyyy"
    }).on('changeDate', function(e){
        var startDate = startDatePicker.datepicker('getDate');
        if(new Date(e.date) < new Date(startDate)){
            $('#inputStartDate').val('')
        }
    });
});