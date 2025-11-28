const spinner = document.querySelector(".fa-spinner")
const update = document.getElementById("update")
const userContainer = document.querySelector(".user-container")
const userBtn = document.getElementById("user-btn")

userBtn.addEventListener('click', async () => {
    spinner.style.display = "block"
    update.textContent = "Please Wait..."
    update.style.color = "red"
    userContainer.innerHTML = ""

    try{
        let response = await fetch("https://api.github.com/users")
        let users = await response.json()
        console.log(users)
        update.textContent = "Users Loaded Successfully"
        update.style.color = "lightgrey"
        update.style.fontsize = "30px"
        userContainer.style.color = "lightgray"
        spinner.style.display = "none"

        users.forEach((user)=> {
            const userCard = document.createElement("div")
            userCard.innerHTML = `
            <img src = "${user.avatar_url}" alt = "user avatar" height="150" width="150" />
            <p><strong>User Login:</strong>${user.login}</p>
            <p><strong>User Id:</strong>${user.id}</p>
            <p><strong>Followers:</strong>${user.followers || "Unknown"}</p>
            <p><strong>Following:</strong>${user.following || "Unknown"}</p>
            <p><strong>Profile:</strong><a href="${
                user.html_url
            }" target="_blank">View Profile<a/></p>
            `;

            userContainer.appendChild(userCard);
        });
    }
    catch(error){
        spinner.style.display = "none";
        update.textContent="";
        userContainer.innerHTML = "Failed to load users... Check your internet connectin and try again later or check your URL"
        userContainer.style.color = 'red'
        console.error('Failed to fetch user data:', error)
    };
});