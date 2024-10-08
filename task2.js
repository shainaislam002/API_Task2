const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
        const getCourses = () => JSON.parse(localStorage.getItem('courses')) || [];
        const saveCourses = (courses) => localStorage.setItem('courses', JSON.stringify(courses));

        const displayCourses = () => {
            const courseList = document.getElementById('courseList');
            courseList.innerHTML = ''; 

            const courses = getCourses();

            courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course';
                courseDiv.setAttribute('data-id', course.id);

                courseDiv.innerHTML = `
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <small class="course-duration">Duration: ${course.duration}</small>
                    <div class="actions">
                        <button onclick="editCourse('${course.id}')">Edit</button>
                        <button class="delete" onclick="deleteCourse('${course.id}')">Delete</button>
                    </div>
                `;

                courseList.appendChild(courseDiv);
            });
        };
        const addCourse = (title, description, duration) => {
            const courses = getCourses();
            courses.push({ id: generateId(), title, description, duration });
            saveCourses(courses);
            displayCourses();
        };
        const deleteCourse = (id) => {
            let courses = getCourses();
            courses = courses.filter(course => course.id !== id);
            saveCourses(courses);
            displayCourses();
        };
        const editCourse = (id) => {
            const courses = getCourses();
            const course = courses.find(course => course.id === id);

            if (course) {
                document.getElementById('courseTitle').value = course.title;
                document.getElementById('courseDescription').value = course.description;
                document.getElementById('courseDuration').value = course.duration;
                deleteCourse(id);
            }
        };
        document.getElementById('courseForm').addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.getElementById('courseTitle').value.trim();
            const description = document.getElementById('courseDescription').value.trim();
            const duration = document.getElementById('courseDuration').value.trim();

            if (title && description && duration) {
                addCourse(title, description, duration);
                document.getElementById('courseForm').reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
        displayCourses();