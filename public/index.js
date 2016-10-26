$(function(){
    $('span').click(function(e){
        var data = $(this).data('id');
        var cls = $(this).data('class');
        e.preventDefault();
        switch(cls){
            case('delete'):
                $.ajax({
                    url : 'http://localhost:5000/list/'+data,
                    type : 'DELETE',
                    success: function(data){
                        if(data) location.href = 'http://localhost:5000/list/'
                    }
                });
            case('edit'): location.href = 'http://localhost:5000/list/'+data
            default: return;
        }
    });
})