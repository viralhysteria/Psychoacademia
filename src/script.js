const coll = document.querySelector(".papers");
const links = coll.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
}

const body = document.body;
const toggle = document.querySelector(".toggle");
const header = document.querySelector("header");

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    header.classList.add("dark");
    toggle.textContent = "LIGHT MODE";
} else {
    toggle.textContent = "DARK MODE";
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    header.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "LIGHT MODE";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "DARK MODE";
    }
});

fetch('src/links.json', {
        mode: 'cors'
    })
    .then(response => response.json())
    .then(links => {
        const rows = links.map(link => `
      <tr>
        <td><a href="${link.url}">${link.title}</a></td>
      </tr>
    `);

        const table = `
      <table class="papers">
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    `;

        console.log(table);
    })
    .catch(error => console.error(error));

const papers = document.querySelectorAll(".papers tbody tr td a");

fetch('path/to/cat.json')
    .then(response => response.json())
    .then(cat => {
        papers.forEach((paper) => {
            const m = cat.reduce((i, { r, iClasses }) => {
                if (r.test(paper.textContent)) {
                    return [...i, ...iClasses];
                }
                return i;
            }, []);

            if (m.length > 0) {
                const container = document.createElement("div");
                container.classList.add("fa-container");
                container.style.display = "inline-flex";

                m.forEach((iClass) => {
                    const e = document.createElement("i");
                    e.classList.add("fas", iClass);
                    container.appendChild(e);
                });

                paper.insertAdjacentElement("beforebegin", container);
            } else {
                const e = document.createElement("i");
                e.classList.add("fas", "fa-newspaper");
                paper.insertAdjacentElement("beforebegin", e);
            }
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
    });

// paper.forEach((a) => {
//   const m = cat.reduce((i, { r, i: iClasses }) => {
//     if (r.test(a.textContent)) {
//       return [...i, ...iClasses];
//     }
//     return i;
//   }, []);

//   if (m.length > 0) {
//     const container = document.createElement("div");
//     container.classList.add("fa-container");
//     container.style.display = "inline-flex";

//     m.forEach((iClass) => {
//       const e = document.createElement("i");
//       e.classList.add("fas", iClass);
//       container.appendChild(e);
//     });

//     a.insertAdjacentElement("beforebegin", container);
//   } else {
//     const e = document.createElement("i");
//     e.classList.add("fas", "fa-newspaper");
//     a.insertAdjacentElement("beforebegin", e);
//   }
// });