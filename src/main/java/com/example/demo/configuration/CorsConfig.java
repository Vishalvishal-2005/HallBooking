package com.example.demo.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    /**
     * Configures Cross-Origin Resource Sharing (CORS) settings for the application.
     * This method returns a {@link WebMvcConfigurer} that allows specific HTTP methods
     * from a specified origin to access the resources.
     *
     * <p>The CORS configuration allows requests from the origin
     * "http://localhost:3000" and permits the following HTTP methods:
     * <ul>
     *   <li>GET</li>
     *   <li>POST</li>
     *   <li>PUT</li>
     *   <li>DELETE</li>
     *   <li>OPTIONS</li>
     * </ul>
     *
     * @return a {@link WebMvcConfigurer} instance with CORS mappings configured.
     *
     * @throws IllegalArgumentException if the provided origin or methods are invalid.
     * @throws NullPointerException if the registry is null when attempting to add mappings.
     */
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            /**
             * Configures CORS (Cross-Origin Resource Sharing) mappings for the application.
             * This method allows specific origins and HTTP methods for cross-origin requests.
             *
             * @param registry the {@link CorsRegistry} to be configured with CORS mappings
             *
             * @throws IllegalArgumentException if the provided {@code registry} is null
             * @throws UnsupportedOperationException if the CORS configuration cannot be applied
             *
             * <p>
             * This method adds a mapping for all paths ("/**") and allows requests from
             * "http://localhost:3000" using the following HTTP methods:
             * GET, POST, PUT, DELETE, and OPTIONS.
             * </p>
             */
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
    @Configuration
    public class MvcConfig implements WebMvcConfigurer {
        @Override
        /**
         * Configures resource handlers for serving static resources.
         * This method adds a resource handler that maps requests for
         * resources located in the "/uploads/**" path to the
         * physical location "C:/uploads/" on the file system.
         *
         * @param registry the registry to which resource handlers are added
         *
         * @throws IllegalArgumentException if the provided registry is null
         * @throws SecurityException if the application does not have permission
         *         to access the specified file location
         */
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:C:/uploads/"); // ✅ Corrected the path
        }
    }
    

}
