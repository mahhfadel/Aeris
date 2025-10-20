import React, { useState } from "react";
import { PinInput, HStack, Button, Text, Link, Group } from "@chakra-ui/react";
import logo from "@/assets/Logo.svg";
import "./LoginPage.scss";

const VerficacaoPinPage = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pin.some((digit) => digit === "") || pin.length !== 6) {
      setPinError("O código deve ter exatamente 6 dígitos.");
      return;
    }

    setPinError("");
    alert(pin.join(""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  return (
    <div className="container-body">
      <div className="container-logo">
        <img src={logo} alt="Logo da Aeris Plataforma de Pesquisa" className="logo" />
      </div>

      <div className="container-form">
        <HStack as="form" width="full" className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Recuperar Conta</h2>
          <PinInput.Root
            className="pin-input"
            type="numeric"
            size="2xl"
            autoFocus
          >
            <PinInput.HiddenInput />
            <PinInput.Control>
              <Group>
                {Array.from({ length: 6 }).map((_, index) => (
                  <PinInput.Input
                    key={index}
                    index={index}
                    value={pin[index]}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </Group>
            </PinInput.Control>
          </PinInput.Root>

          {pinError && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {pinError}
            </Text>
          )}

          <Button type="submit" width="full" className="button">
            Confirmar
          </Button>

          <Text className="navegation-text">
            Esqueceu sua senha?{" "}
            <Link href="/recuperar-senha" color="#002930" textDecoration="underline">
              Clique aqui
            </Link>
          </Text>
        </HStack>
      </div>
    </div>
  );
};

export default VerficacaoPinPage;
