var render = function () {

    container.innerHTML = "";
    var left = document.createElement('div');
    left.classList.add("pure-u-10-24");        
    container.appendChild(left); 

    var middle = document.createElement('div');
    middle.classList.add('pure-u-2-24');
    container.appendChild(middle)

    var right = document.createElement('div');
    right.classList.add("pure-u-10-24");        
    container.appendChild(right);

    var iFrameDiv = document.createElement('div');
    left.appendChild(iFrameDiv);
    var iFrame = document.createElement('iframe');
    iFrameDiv.appendChild(iFrame);
    iFrame.classname = 'embed-container';
    iFrame.src = 'https://embed.spotify.com/?uri=spotify%3Atrack%3A3BNjuJBicYBzcgos3TPlOx';
    iFrame.frameborder = '0';
    iFrame.style="width:100%;height:100%; border: 50px;"


    var h1 = document.createElement('h1');
    h1.innerHTML = 'About Us:'
    right.appendChild(h1);

    var img = document.createElement('img');
    img.src = "media/money_man.gif"
    right.appendChild(img);

    var names = ["Peter", "John", "Scott"];
    var nameTable = document.createElement('table');
    nameTable.classList.add("pure-table")
    left.appendChild(nameTable);
    for (var i = names.length - 1; i >= 0; i--) {
      var tr = document.createElement('tr');
      nameTable.appendChild(tr);
      var td = document.createElement('td');
      td.innerText = names[i];
      td.style = "font-size: 3em;"
      tr.appendChild(td);
    };
};

module.exports = render;