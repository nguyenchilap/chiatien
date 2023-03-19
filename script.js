(() => {

    let members = [];

    function getElementByQuerySelector(selector) {
        return $(selector);
    }

    function getElementById(id) {
        return $(`#${id}`);
    }

    function getInputByName(name) {
        return $(`input[name=${name}]`);
    }

    //add member handler
    function onAddMemberBtnClicked() {
        getElementById('addMemberBtn').click(() => {
            const inputName = getInputByName('name');
            const inputPaid = getInputByName('paid');
            renderMember(inputName.val(), inputPaid.val());
            members.push( {
                name: inputName.val(), 
                paid: inputPaid.val()
            });
            inputName.val('');
            inputPaid.val('');
        });
    }

    //render member
    function renderMember(name, paid) {
        getElementByQuerySelector('#memberInput .listMember').append(`
            <div class="members mt-2 d-flex">
                <div class="name" style="margin-right: 6px">${name}</div>
                <div class="paid">${paid}</div>
            </div>`);
    }

    //calculate

    function onCalculateBtnClicked() {
       getElementById('calculate').click(() => {
            calculate();
       });
    }

    function calculate() {
        let sum = 0,
            eachPaid = 0;

        sum = members.reduce((accumulator, current) => {
            return accumulator += Number.parseInt(current.paid);
        }, 0);
        
        eachPaid = sum / members.length;

        members.map((element) => {
            element.result = eachPaid - element.paid;
            return element;
        });

        members.forEach((element) => {
            getElementByQuerySelector('#memberOutput .listMember').append(`
                <div class="members mt-2 d-flex">
                    <div class="name" style="margin-right: 6px">${element.name}</div>
                    <div class="paid">${(element.result > 0) ? 'Trả ' : 'Nhận '} ${Math.abs(element.result)}</div>
                </div>`);
        });
    }

    function onResetAllBtnClicked () {
        getInputByName('name').val('');
        getInputByName('paid').val('');
        getElementByQuerySelector('#memberInput .listMember').html('');
        getElementByQuerySelector('#memberOutput .listMember').html('');
    }


    function init() {
        onAddMemberBtnClicked();

        onCalculateBtnClicked();

        onResetAllBtnClicked();
    }

    init();

})();