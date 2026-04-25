using ShippingCalculatorP2.Domain.Interfaces;

namespace ShippingCalculatorP2.Infrastructure.Calculators
{
    public class CalculadoraReinoUnido : ICalculadoraEnvio
    {
        public double CalcularTarifa(double peso)
        {
            return peso * 10;
        }

        public string ObtenerNombrePais()
        {
            return "Reino Unido (UK)";
        }
    }
}
