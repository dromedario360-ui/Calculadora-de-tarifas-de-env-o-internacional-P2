using ShippingCalculatorP2.Domain.Interfaces;
using ShippingCalculatorP2.Infrastructure.Calculators;

namespace ShippingCalculatorP2.Infrastructure
{
    public class FabricaCalculadora
    {
        public ICalculadoraEnvio Crear(string pais)
        {
            switch (pais)
            {
                case "1":
                    return new CalculadoraIndia();
                case "2":
                    return new CalculadoraEstadosUnidos();
                case "3":
                    return new CalculadoraReinoUnido();
                default:
                    return null;
            }
        }
    }
}
