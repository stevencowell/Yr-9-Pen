(() => {
  const graphics = [
    ['Project Brief and Success Criteria', '01-project-brief.png'],
    ['Approved Resource and Kit Constraints', '02-authority-map.png'],
    ['WHS, WMS and Lathe Controls', '03-whs-wms.png'],
    ['Timber Selection and Grain Orientation', '04-timber-grain.png'],
    ['Brass Sleeves, Drilling and Swarf', '05-sleeves-drilling.png'],
    ['Mandrel Setup and Pre-start Check', '06-mandrel-check.png'],
    ['Controlled Turning and Profile Development', '07-turning-cycle.png'],
    ['Surface Diagnosis and Abrasive Sequence', '08-surface-abrasives.png'],
    ['Approved Finish and Quality Checks', '09-finish-quality.png'],
    ['Kit Components and Controlled Assembly', '10-assembly.png'],
    ['Photos, Flowchart and Problem Solving', '11-evidence-flow.png'],
    ['PMI Evaluation and Skill Transfer', '12-pmi-transfer.png']
  ];

  function addInfographics() {
    const cards = document.querySelectorAll('#folioCards .folio-card');
    cards.forEach((card, index) => {
      const graphic = graphics[index];
      const slot = card.querySelector('[data-guide-slot]');
      if (!graphic || !slot || card.querySelector('.folio-card-graphic')) return;

      const figure = document.createElement('figure');
      figure.className = 'folio-card-graphic';
      figure.innerHTML = `
        <img src="assets/folio/cards/${graphic[1]}" alt="${graphic[0]} infographic" loading="lazy" decoding="async">
        <figcaption>Use this visual to help you identify the evidence and explanation needed for this stage.</figcaption>
      `;
      slot.replaceWith(figure);
    });
  }

  function start() {
    requestAnimationFrame(addInfographics);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

