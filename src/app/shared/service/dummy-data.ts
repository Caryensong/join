export const avatarColor: string[] = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B"
];

export const dummyData: { firstname: string; lastname: string; email: string; phone: string; color: string }[] = [
    {
        firstname: "Lena",
        lastname: "Schmidt",
        email: "lena.schmidt82@gmail.com",
        phone: "+49 1521 1234567",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Markus",
        lastname: "Sturmfels",
        email: "mark.thunderrock@gmail.com",
        phone: "+49 171 2345678",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Julia",
        lastname: "Weber",
        email: "julia.weber33@gmail.com",
        phone: "+49 160 3456789",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Thomas",
        lastname: "Eisenherz",
        email: "tom.ironheart@gmail.com",
        phone: "+49 176 4567890",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Sophie",
        lastname: "Bauer",
        email: "sophie.bauer19@gmail.com",
        phone: "+49 151 5678901",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Felix",
        lastname: "Sturmkind",
        email: "felix.stormchild@gmail.com",
        phone: "+49 159 6789012",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Anna",
        lastname: "Keller",
        email: "anna.keller88@gmail.com",
        phone: "+49 172 7890123",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Michael",
        lastname: "Schattenwald",
        email: "mike.shadowwood@gmail.com",
        phone: "+49 175 8901234",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Laura",
        lastname: "Fischer",
        email: "laura.fischer77@gmail.com",
        phone: "+49 157 9012345",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
    },
    {
        firstname: "Stefan",
        lastname: "Morgentau",
        email: "stefan.dewlight@gmail.com",
        phone: "+49 162 0123456",
        color: avatarColor[Math.floor(Math.random() * avatarColor.length)]
        }
];

export const dummyDataTasks: { title: string; description: string; date: string; priority: string; assignedToUserId: string[]; status: string; category: string; subtasks: { subtask: string; isCompleted: boolean; isEditing: boolean }[] }[] = [
    {
        title: "HomePage",
        description: "Create new component for the homepage",
        date: "2025-04-20",
        priority: "high",
        assignedToUserId: ["CCptP0yIlYy5X2uwA4de", "IzjGbNzLyv7OkpGeg3B4"],
        status: "todo",
        category: "Technical Task",
        subtasks: [
            { subtask: "create hero page", isCompleted: true, isEditing: false },
            { subtask: "navbar", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "Recipe List",
        description: "Develop the recipe list page",
        date: "2025-04-21",
        priority: "medium",
        assignedToUserId: ["KTbjIpLnVGi8q3OjCSHr", "XztzCuRkUPxQ2HOSqPBg", "e0Qb9uGieBOxesbvWUQd"],
        status: "inProgress",
        category: "User Story",
        subtasks: [
            { subtask: "fetch recipes from API", isCompleted: false, isEditing: false },
            { subtask: "display recipes in a grid", isCompleted: true, isEditing: false },
            { subtask: "add pagination", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "Add Recipe Form",
        description: "Create a form for adding new recipes",
        date: "2025-04-22",
        priority: "low",
        assignedToUserId: ["i2Zsc7SoKgQPbLa8OKOx"],
        status: "awaitFeedback",
        category: "Technical Task",
        subtasks: []
    },
    {
        title: "User Authentication",
        description: "Implement user authentication",
        date: "2025-04-23",
        priority: "high",
        assignedToUserId: ["mywr0t26HhjyiDGSNPS5", "vxNrGLk2bKtm4KZNXHJM"],
        status: "done",
        category: "User Story",
        subtasks: [
            { subtask: "create login page", isCompleted: true, isEditing: false },
            { subtask: "create registration page", isCompleted: true, isEditing: false },
            { subtask: "implement JWT authentication", isCompleted: true, isEditing: false }
        ]
    },
    {
        title: "Recipe Detail Page",
        description: "Develop the recipe detail page",
        date: "2025-04-24",
        priority: "medium",
        assignedToUserId: ["wANKfeaSFQO0R6lBYzAJ"],
        status: "todo",
        category: "Technical Task",
        subtasks: [
            { subtask: "fetch recipe details from API", isCompleted: false, isEditing: false },
            { subtask: "display recipe details", isCompleted: false, isEditing: false },
            { subtask: "add comments section", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "Search Functionality",
        description: "Implement search functionality for recipes",
        date: "2025-04-25",
        priority: "low",
        assignedToUserId: ["xS1ognbuTPARIklB3HfT", "xbVEjSZTNdq26NFYdsr9"],
        status: "inProgress",
        category: "User Story",
        subtasks: [
            { subtask: "create search bar", isCompleted: true, isEditing: false },
            { subtask: "implement search logic", isCompleted: false, isEditing: false },
            { subtask: "display search results", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "Responsive Design",
        description: "Ensure the website is responsive",
        date: "2025-04-26",
        priority: "high",
        assignedToUserId: ["CCptP0yIlYy5X2uwA4de", "IzjGbNzLyv7OkpGeg3B4", "KTbjIpLnVGi8q3OjCSHr"],
        status: "awaitFeedback",
        category: "Technical Task",
        subtasks: [
            { subtask: "test on mobile devices", isCompleted: false, isEditing: false },
            { subtask: "test on tablets", isCompleted: true, isEditing: false },
            { subtask: "test on desktops", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "User Profile",
        description: "Develop user profile page",
        date: "2025-04-27",
        priority: "medium",
        assignedToUserId: ["XztzCuRkUPxQ2HOSqPBg", "e0Qb9uGieBOxesbvWUQd"],
        status: "done",
        category: "User Story",
        subtasks: [
            { subtask: "fetch user data from API", isCompleted: true, isEditing: false },
            { subtask: "display user data", isCompleted: true, isEditing: false },
            { subtask: "allow user to edit profile", isCompleted: true, isEditing: false }
        ]
    },
    {
        title: "Favorites Feature",
        description: "Implement feature to favorite recipes",
        date: "2025-04-28",
        priority: "low",
        assignedToUserId: ["i2Zsc7SoKgQPbLa8OKOx", "mywr0t26HhjyiDGSNPS5"],
        status: "todo",
        category: "Technical Task",
        subtasks: [
            { subtask: "add favorite button", isCompleted: false, isEditing: false },
            { subtask: "store favorites in database", isCompleted: false, isEditing: false },
            { subtask: "display favorites on profile", isCompleted: false, isEditing: false }
        ]
    },
    {
        title: "Notifications",
        description: "Implement notifications for users",
        date: "2025-04-29",
        priority: "high",
        assignedToUserId: ["vxNrGLk2bKtm4KZNXHJM", "wANKfeaSFQO0R6lBYzAJ", "xS1ognbuTPARIklB3HfT"],
        status: "inProgress",
        category: "User Story",
        subtasks: [
            { subtask: "create notification system", isCompleted: true, isEditing: false },
            { subtask: "send notifications on new recipes", isCompleted: false, isEditing: false },
            { subtask: "display notifications in UI", isCompleted: false, isEditing: false }
        ]
    }
];