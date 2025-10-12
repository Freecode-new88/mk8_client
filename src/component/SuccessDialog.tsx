import Swal from "sweetalert2";
import ConfettiExplosion from "react-confetti-explosion";
import Success from "../assets/Success.png";

export interface SuccessCodeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  point: string;
}

export const showSuccessDialog = async ({ setOpen, point }: SuccessCodeProps) => {
  Swal.fire({
    title: `
      <div style="display: flex; justify-content: center; align-items: center;">
        <img src="${Success}" alt="Success Icon" style="width: 100px;" />
      </div>
    `,
    html: `
      <div style="text-align: center;  position: relative;">
        <div id="confetti-placeholder" style="position: relative; margin-bottom: 20px;"></div>
        <h3 style="font-weight: bold; margin-top: 20px;">ขอแสดงความยินดี</h3>
        <p style="margin-top: 10px;">
          คุณได้รับ 
          <span style="color: #28a745; font-weight: bold;">${point} คะแนนสำเร็จ</span>
        </p>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "ต่อไป",
    confirmButtonColor: "#00BFFF",
    background: "#ffffff",
    width: "400px",
    padding: "20px",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      // Add ConfettiExplosion to the placeholder
      const confettiPlaceholder = document.getElementById("confetti-placeholder");
      if (confettiPlaceholder) {
        const confettiDiv = document.createElement("div");
        confettiDiv.style.position = "absolute";
        confettiDiv.style.width = "100%";
        confettiDiv.style.height = "100%";
        confettiPlaceholder.appendChild(confettiDiv);
        ConfettiExplosion({ duration: 5000, particleCount: 150 });
      }
    },
  }).then(() => {
    // Close the modal and update the state
    setOpen(false);
  });
};
