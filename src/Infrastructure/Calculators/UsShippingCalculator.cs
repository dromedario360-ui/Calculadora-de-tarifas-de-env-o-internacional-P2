using ShippingCalculatorP2.Domain.Interfaces;

namespace ShippingCalculatorP2.Infrastructure.Calculators
{
    public class CalculadoraEstadosUnidos : ICalculadoraEnvio
    {
        public double CalcularTarifa(double peso)
        {
            return peso * 8;
        }

        public string ObtenerNombrePais()
        {
            return "Estados Unidos (US)";
        }
    }
}
