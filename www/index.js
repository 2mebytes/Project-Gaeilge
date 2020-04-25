console.log("hi");

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('bg', 'assets/bg2.png');
    this.load.image('picApple', 'assets/apple.png');
    this.load.image('picPerson', 'assets/person.png');
    //this.load.image('textbox', 'assets/textbox.png')
}

var itemText;
var invItem = {
    bearla: "apple",
    gaeilge: "úll",
    isKnown: false,
    inInv: 0,
    addInv: function(){
        if (invItem.isKnown == false){
            invItem.isKnown = true;
            
        }
        invItem.inInv += 1;
        itemText.setText(invItem.gaeilge + ": " + invItem.inInv);
    }
};
var apple = Object.create(invItem);

function create () {
    this.add.image(400, 300, 'bg');
    apple.pic = this.add.image(400, 300, 'picApple');
    var person = this.add.image(200, 300, 'picPerson');
    //var textbox = this.add.image(16, 500, 'textbox');
    //textbox.hideObj;
    //  note for later: when clicking the tree, make an apple fall and bounce similar to stars in tutorial

    itemText = this.add.text(16, 16, 'test', {fontFamily: "Trebuchet MS", fontSize: '32px', fill: '#000000' });
    convoText = this.add.text(16, 500, ' ', {fontFamily: "Trebuchet MS", fontSize: '32px', fill: '#000000' });
    apple.pic.setInteractive();
    person.setInteractive();
    apple.pic.on('clicked', apple.addInv);
    apple.pic.on('clicked', hideObj, this);
    person.on('clicked', convo, this);

    this.input.on('gameobjectup', function (pointer, gameObject) {
        gameObject.emit('clicked', gameObject);
    }, this);
}

function hideObj(invItem){ //couldn't figure out how to combine addInv and hideObj so I made two seperate functions
    invItem.off('clicked', invItem.addInv);
    invItem.input.enabled = false;
    invItem.setVisible(false);
}

function convo(personConvo){
    if (apple.inInv >= 1) {
        convoText.setText("Thank you for an " + apple.gaeilge + "!");
        apple.inInv -= 1;
        itemText.setText(apple.gaeilge + ": " + apple.inInv);
    }
    else{
        convoText.setText("Hi, I want one " + apple.gaeilge + ". Can you help me?");
    }
    //personConvo.off('clicked', personConvo.convo);
}

function update ()
{

}