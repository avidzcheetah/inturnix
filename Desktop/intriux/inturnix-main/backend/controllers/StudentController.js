import Student from "../models/studentSchema.js"; // adjust path if needed

class StudentController {
  // Create a new student with all fields
  static async createStudent(req, res) {
    try {
      const studentData = req.body; // take all fields from request body

      // Optional: basic validation for required fields
      const { firstName, lastName, email, password } = studentData;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "firstName, lastName, email, and password are required" });
      }

      // Check if email already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create student document
      const student = new Student(studentData);
      await student.save();

      res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

static async updateStudent(req, res) {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: "Student not found" });

      // Update text fields
      Object.keys(req.body).forEach(key => student[key] = req.body[key]);

      // Update files if uploaded
      if (req.files) {
        if (req.files.cv) {
          student.cv = {
            data: req.files.cv[0].buffer,
            contentType: req.files.cv[0].mimetype,
            filename: req.files.cv[0].originalname,
            uploadDate: new Date()
          };
        }
        if (req.files.profilePicture) {
          student.profilePicture = {
            data: req.files.profilePicture[0].buffer,
            contentType: req.files.profilePicture[0].mimetype,
            filename: req.files.profilePicture[0].originalname,
            uploadDate: new Date()
          };
        }
      }

      await student.save();
      res.status(200).json({ message: "Student updated successfully", student });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await Student.find().select("-cv.data -profilePicture.data"); 
      // Exclude actual file data for performance
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  // Get single student by ID
  static async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id).select("-cv.data -profilePicture.data");
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  // Optional: get actual CV or profile picture
  static async getCV(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student || !student.cv || !student.cv.data) {
        return res.status(404).json({ message: "CV not found" });
      }
      res.set("Content-Type", student.cv.contentType);
      res.send(student.cv.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }

  static async getProfilePicture(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student || !student.profilePicture || !student.profilePicture.data) {
        return res.status(404).json({ message: "Profile picture not found" });
      }
      res.set("Content-Type", student.profilePicture.contentType);
      res.send(student.profilePicture.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
}





export default StudentController;
