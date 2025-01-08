const jobContainer = document.querySelector(".job-listing-div");
const search = document.getElementById("search");
const searchBarContainer = document.getElementById('searchBarContainer');
let jobData = [];

async function getData() {
    try {
        const res = await fetch("./data.json");
        jobData = await res.json();
        console.log(jobData);
        displayJobs(jobData);

    }
    catch (error) {
        console.log(error);
    }
}
getData();


function displayJobs(jobData) {
    jobContainer.innerHTML = "";
    jobData.map((job) => {


        // Create the job container
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job');

        const companyLogoAndDetail = document.createElement("div");
        companyLogoAndDetail.classList.add("company-logo-detail-div");
        jobDiv.append(companyLogoAndDetail);

        // Create the company logo container
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('company-logo-div');
        const logoImg = document.createElement('img');
        logoImg.src = `${job.logo}`;
        logoImg.alt = 'company';
        logoDiv.appendChild(logoImg);

        // Create the company detail container
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('company-detail-div');

        const companyDetail = document.createElement('div');
        companyDetail.classList.add('company-detail');

        // Add company details
        const companyName = document.createElement('p');
        companyName.textContent = `${job.company}`;
        companyName.classList.add("company-name");
        companyName.classList.add("league-spartan-700");

        const newTag = document.createElement('p');
        newTag.textContent = (job.new ? "NEW!" : "");
        if (newTag.textContent != '') {
            newTag.classList.add('new-tag'); // Optional: Add a class for styling
        }


        const featuredTag = document.createElement('p');
        featuredTag.textContent = (job.featured ? 'FEATURED' : '');
        if (featuredTag.textContent != '') {
            featuredTag.classList.add('featured-tag'); // Optional: Add a class for styling
        }


        companyDetail.append(companyName, newTag, featuredTag);

        // Add job position
        const jobPosition = document.createElement('p');
        jobPosition.textContent = `${job.position}`;
        jobPosition.style.fontWeight = "bold";

        // Add job details (time and location)
        const jobDetailsDiv = document.createElement('div');
        const postedTime = document.createElement('p');
        postedTime.textContent = `${job.postedAt}`;
        jobDetailsDiv.style.color = "hsl(180, 8%, 52%)";

        const jobDetailsList = document.createElement('ul');
        const jobType = document.createElement('li');
        jobType.textContent = `${job.contract}`;

        const jobLocation = document.createElement('li');
        jobLocation.textContent = `${job.location}`;

        jobDetailsList.append(jobType, jobLocation);
        jobDetailsDiv.append(postedTime, jobDetailsList);

        // Combine company details and job details
        detailDiv.append(companyDetail, jobPosition, jobDetailsDiv);

        // Create the skills container
        const skillsDiv = document.createElement('div');
        skillsDiv.classList.add('company-skills-div');

        // Add skills
        const skills = [`${job.role}`, `${job.level}`, ...job.languages, ...job.tools];
        skills.forEach(skill => {
            const skillP = document.createElement('p');
            skillP.textContent = skill;
            skillsDiv.appendChild(skillP);
        });

        // Combine everything into the job container
        companyLogoAndDetail.append(logoDiv, detailDiv);
        jobDiv.append(skillsDiv);

        // Add the job container to the job listing
        jobContainer.appendChild(jobDiv);


    });
}

search.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue.trim(" "));

    //filtered jobs
    const filteredJobs = jobData.filter((job) => {
        const possibleSearches = [
            job.company.toLowerCase(),
            job.position.toLowerCase(),
            job.role.toLowerCase(),
            job.level.toLowerCase(),
            ...job.languages.map(lang => lang.toLowerCase()),
            ...job.tools.map(tool => tool.toLowerCase()),
        ];

        return possibleSearches.some((search) => search.includes(searchValue));
    });
    // console.log(filteredJobs);
    displayJobs(filteredJobs);
});



