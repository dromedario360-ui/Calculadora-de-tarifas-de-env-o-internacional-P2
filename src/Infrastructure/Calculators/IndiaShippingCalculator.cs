using ShippingCalculatorP2.Domain.Interfaces;

namespace ShippingCalculatorP2.Infrastructure.Calculators
{
    public class CalculadoraIndia : ICalculadoraEnvio
    {
        public double CalcularTarifa(double peso)
        {
            return peso * 5;
        }

        public string ObtenerNombrePais()
        {
            return "India";
        }
    }
}
