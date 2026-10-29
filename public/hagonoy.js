(function () {
  /* Map: switch the embedded Google Map to a selected barangay */
  var frame = document.getElementById('map-frame');
  document.querySelectorAll('.spots button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.spots button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      var q = encodeURIComponent(b.dataset.q + ', Hagonoy, Bulacan, Philippines');
      frame.src = 'https://www.google.com/maps?q=' + q + '&z=15&output=embed';
    });
  });

  /* Quiz */
  var Q = [
    { q: 'What is the biggest single cause of land subsidence worldwide?', o: ['Earthquakes', 'Groundwater pumping that compacts aquifers', 'Heavy rain', 'Sea waves'], a: 1, e: 'USGS names aquifer compaction from pumping as by far the largest single cause.' },
    { q: 'Where is Hagonoy, Bulacan?', o: ['Northern Bulacan, in the mountains', 'Southwest Bulacan, beside Manila Bay', 'Central Luzon highlands', 'Eastern Bulacan'], a: 1, e: 'Hagonoy sits at the southwest corner of Bulacan, with a low coastal and marsh landscape.' },
    { q: 'Why does a sinking town flood more often?', o: ['Rain gets heavier', 'Its ground gets closer to tide and river water levels', 'Rivers dry up', 'Roads get wider'], a: 1, e: 'As the ground drops, the same high tide or river rise covers more land.' },
    { q: 'Does compacted clay spring back after pumping stops?', o: ['Yes, within weeks', 'Yes, once it rains', 'Mostly no, the loss is largely permanent', 'Only in summer'], a: 2, e: 'Squeezed clay stays compact, so the aquifer also keeps less storage.' },
    { q: 'Which action helps most to slow subsidence?', o: ['Drilling more wells', 'Licensing wells and using surface water', 'Raising only the road level', 'Ignoring small cracks'], a: 1, e: 'Tokyo stopped its sinking by limiting groundwater use and giving industry river water.' },
    { q: 'Which is an early warning sign at home?', o: ['Cracked walls or floors, tilting fences, rising well casings', 'Louder rain', 'Cooler nights', 'Faster internet'], a: 0, e: 'Uneven sinking strains structures. Report such signs using the form on this site.' }
  ];
  var i = 0, score = 0, box = document.getElementById('quiz-box');
  if (box) render();
  function render() {
    if (i >= Q.length) {
      box.innerHTML = '<p class="quiz__meta">Done</p><p class="quiz__q">You scored ' + score + ' of ' + Q.length + '</p><p class="quiz__fb">' +
        (score >= 5 ? 'Great work. Share what you learned with your barangay.' : 'Review the sections above and try again.') + '</p><button class="btn" id="qr">Try again</button>';
      document.getElementById('qr').onclick = function () { i = 0; score = 0; render(); };
      return;
    }
    var c = Q[i];
    box.innerHTML = '<p class="quiz__meta">Question ' + (i + 1) + ' of ' + Q.length + '</p><p class="quiz__q"></p><div class="quiz__opts"></div><p class="quiz__fb" aria-live="polite"></p><button class="btn" id="qn" hidden>Next</button>';
    box.querySelector('.quiz__q').textContent = c.q;
    var wrap = box.querySelector('.quiz__opts');
    c.o.forEach(function (t, k) {
      var b = document.createElement('button');
      b.className = 'opt'; b.textContent = t;
      b.onclick = function () {
        wrap.querySelectorAll('.opt').forEach(function (x, n) { x.disabled = true; if (n === c.a) x.classList.add('ok'); });
        if (k === c.a) score++; else b.classList.add('bad');
        box.querySelector('.quiz__fb').textContent = (k === c.a ? 'Correct. ' : 'Not quite. ') + c.e;
        var nx = document.getElementById('qn'); nx.hidden = false; nx.textContent = i === Q.length - 1 ? 'See score' : 'Next';
        nx.onclick = function () { i++; render(); };
      };
      wrap.appendChild(b);
    });
  }

  /* Report form (prototype: nothing is sent anywhere) */
  var f = document.getElementById('report-form'), ok = document.getElementById('report-ok');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(f);
    ok.hidden = false;
    ok.textContent = 'Thank you' + (d.get('name') ? ', ' + d.get('name') : '') + '. Your report on "' + d.get('type') + '" in ' + d.get('brgy') + ' was recorded in this prototype. In the live version it goes to the group\u2019s Google Form.';
    f.reset(); ok.focus();
  });
})();