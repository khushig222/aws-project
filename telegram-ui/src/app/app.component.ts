import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms"; // ✅ Import FormsModule for ngModel
import axios from "axios";
 
@Component({
  selector: "app-root",
  standalone: true, // ✅ Standalone component
  imports: [FormsModule], // ✅ Enable FormsModule
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  message: string = "";
 
  async saveMessage() {
    if (!this.message.trim()) {
      alert("Enter a message");
      return;
    }
 
    try {
      const response = await axios.post("http://localhost:3001/save", {
        content: this.message,
      });
      alert(response.data.message);
      this.message = "";
    } catch (error) {
      alert("Error saving message");
    }
  }
}