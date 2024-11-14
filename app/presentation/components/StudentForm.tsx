import React from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useStudentRegistration } from "@/app/presentation/hooks/useStudentRegistration";
import { Notification } from "@/components/Notification";

const grades = [
  { label: "1er Grado", value: "1" },
  { label: "2do Grado", value: "2" },
  { label: "3er Grado", value: "3" },
];

export const StudentForm: React.FC = () => {
  const { registerStudent, loading, status } = useStudentRegistration();
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gradeRef: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await registerStudent(formData);
    if (success) {
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gradeRef: "",
      });
    }
  };

  // Manejador genérico para todos los cambios de Input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    //console.log(formData);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardBody>
        {status.type && (
          <div className="mb-4">
            <Notification text={status.message} type={status.type} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            isRequired
            variant="bordered"
          />
          <Input
            name="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={handleInputChange}
            isRequired
            variant="bordered"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            isRequired
            variant="bordered"
          />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            isRequired
            variant="bordered"
          />
          <Input
            name="phone"
            type="tel"
            label="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            isRequired
            variant="bordered"
          />
          <Select
            label="Grado"
            placeholder="Selecciona un grado"
            value={formData.gradeRef}
            onChange={handleInputChange}
            name="gradeRef"
            isRequired
            variant="bordered"
          >
            {grades.map((grade) => (
              <SelectItem key={grade.value} value={grade.value}>
                {grade.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            type="submit"
            color={status.type === "error" ? "danger" : "primary"}
            isLoading={loading}
            className="w-full"
            size="lg"
          >
            Registrar Usuario
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};